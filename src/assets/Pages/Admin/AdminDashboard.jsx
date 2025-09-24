import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { RiAddLine, RiBookOpenLine, RiPencilLine, RiDeleteBinLine } from "@remixicon/react";

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    cpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  // Local Lessons Manager (Add/Edit/Delete locally)
  const [lessons, setLessons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    classLevel: "Grade 1 Secondary",
    isPaid: "false",
    price: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_lessons');
    if (saved) {
      try {
        setLessons(JSON.parse(saved));
      } catch {
        setLessons([]);
      }
    }
  }, []);

  const persistLessons = (list) => {
    setLessons(list);
    localStorage.setItem('admin_lessons', JSON.stringify(list));
  };

  const resetLessonForm = () => setLessonForm({ title: "", description: "", classLevel: "Grade 1 Secondary", isPaid: "false", price: "" });

  const handleAddOrUpdateLesson = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = lessons.map(l => l._id === editingId ? {
        ...l,
        title: lessonForm.title || 'Untitled',
        description: lessonForm.description || '',
        classLevel: lessonForm.classLevel,
        isPaid: lessonForm.isPaid === 'true',
        price: Number(lessonForm.price) || 0
      } : l);
      persistLessons(updated);
      setEditingId(null);
      resetLessonForm();
    } else {
      const id = `local-${Date.now()}`;
      const item = {
        _id: id,
        title: lessonForm.title || 'Untitled',
        description: lessonForm.description || '',
        classLevel: lessonForm.classLevel,
        isPaid: lessonForm.isPaid === 'true',
        price: Number(lessonForm.price) || 0,
        createdAt: new Date().toISOString()
      };
      persistLessons([item, ...lessons]);
      resetLessonForm();
    }
  };

  const handleEditLesson = (id) => {
    const l = lessons.find(x => x._id === id);
    if (!l) return;
    setEditingId(id);
    setLessonForm({
      title: l.title || '',
      description: l.description || '',
      classLevel: l.classLevel || 'Grade 1 Secondary',
      isPaid: l.isPaid ? 'true' : 'false',
      price: String(l.price ?? '')
    });
  };

  const handleDeleteLesson = (id) => {
    const filtered = lessons.filter(l => l._id !== id);
    persistLessons(filtered);
    if (editingId === id) {
      setEditingId(null);
      resetLessonForm();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // مسح الخطأ عند التعديل
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // التحقق من صحة البيانات
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // مسح الرسائل السابقة
    setMessage(null);
    
    // التحقق من صحة البيانات
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // تحضير البيانات للإرسال
      const requestData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim(), // ملاحظة: الـ API يتوقع phoneNumber
        password: formData.password,
        cpassword: formData.confirmPassword // ملاحظة: الـ API يتوقع cpassword
      };

      console.log("Sending data:", requestData);

      const response = await fetch("https://edu-master-psi.vercel.app/admin/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXNzZWZob3NzYW0yNTBAZ21haWwuY29tIiwiX2lkIjoiNjcxM2VlODEwYzg0ZmExNWVmOTM1NzRmIiwiaWF0IjoxNzI5NjIwNzI4LCJleHAiOjE3Mjk2MjQzMjh9.nhsrCfxUWHiQpfbZhV_H1FyOKLIW_DgttJeZhJz88d0"
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        // نجح الإرسال
        setMessage({
          type: "success",
          text: result.message || "Admin created successfully!"
        });
        
        // مسح الفورم
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        // فشل الإرسال
        setMessage({
          type: "error",
          text: result.message || result.error || `Error: ${response.status}`
        });
      }

    } catch (error) {
      console.error("Network error:", error);
      setMessage({
        type: "error",
        text: "Network error. Please check your connection and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Admin</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* عرض الرسائل */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === "success" 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors pr-10 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                loading 
                  ? "bg-orange-300 cursor-not-allowed" 
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
            >
              {loading ? "Creating Admin..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Lessons Manager (Local) */}
      <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-90 rounded-lg flex items-center justify-center">
              <RiBookOpenLine className="w-5 h-5 text-orange-50" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-grey-15">Manage Lessons (Local)</h3>
              <p className="text-sm text-grey-15/60">Add, edit, and delete local lessons shown on Courses.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddOrUpdateLesson} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-grey-15/70 mb-1">Title</label>
              <input type="text" placeholder="Title" value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} className="px-3 py-2 border border-white-95 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-50" />
            </div>
            <div>
              <label className="block text-sm text-grey-15/70 mb-1">Level</label>
              <select value={lessonForm.classLevel} onChange={(e) => setLessonForm({ ...lessonForm, classLevel: e.target.value })} className="px-3 py-2 border border-white-95 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-50">
                <option value="Grade 1 Secondary">Grade 1 Secondary</option>
                <option value="Grade 2 Secondary">Grade 2 Secondary</option>
                <option value="Grade 3 Secondary">Grade 3 Secondary</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-grey-15/70 mb-1">Description</label>
              <input type="text" placeholder="Description" value={lessonForm.description} onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })} className="px-3 py-2 border border-white-95 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-50" />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm text-grey-15/70 mb-1">Type</label>
                <select value={lessonForm.isPaid} onChange={(e) => setLessonForm({ ...lessonForm, isPaid: e.target.value })} className="px-3 py-2 border border-white-95 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-50">
                  <option value="false">Free</option>
                  <option value="true">Paid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-grey-15/70 mb-1">Price</label>
                <input type="number" min="0" placeholder="0" value={lessonForm.price} onChange={(e) => setLessonForm({ ...lessonForm, price: e.target.value })} className="px-3 py-2 border border-white-95 rounded-lg w-36 focus:outline-none focus:ring-2 focus:ring-orange-50" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="primary-btn inline-flex items-center gap-2">
              <RiAddLine className="w-4 h-4" />
              {editingId ? 'Update Lesson' : 'Add Lesson'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); resetLessonForm(); }} className="px-4 py-2 border border-white-95 rounded-lg hover:bg-white-95">
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="mt-6">
          {lessons.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-white-95 rounded-xl">
              <div className="w-16 h-16 bg-orange-90 rounded-full flex items-center justify-center mx-auto mb-3">
                <RiBookOpenLine className="w-8 h-8 text-orange-50" />
              </div>
              <p className="text-grey-15/70">No local lessons yet. Use the form above to add one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-grey-15/60">
                    <th className="py-2 pr-4">Title</th>
                    <th className="py-2 pr-4">Level</th>
                    <th className="py-2 pr-4">Price</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map(l => (
                    <tr key={l._id} className="border-t border-white-95">
                      <td className="py-3 pr-4 font-medium text-grey-15">{l.title}</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white-95 text-grey-15">{l.classLevel}</span>
                      </td>
                      <td className="py-3 pr-4">{l.isPaid && l.price > 0 ? `$${l.price}` : 'Free'}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEditLesson(l._id)} className="px-3 py-1 border border-white-95 rounded-lg hover:bg-white-95 inline-flex items-center gap-1">
                            <RiPencilLine className="w-4 h-4" /> Edit
                          </button>
                          <button onClick={() => handleDeleteLesson(l._id)} className="px-3 py-1 border border-white-95 rounded-lg hover:bg-white-95 text-red-600 inline-flex items-center gap-1">
                            <RiDeleteBinLine className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}