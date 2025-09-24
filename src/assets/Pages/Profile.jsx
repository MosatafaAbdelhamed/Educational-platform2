import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiGraduationCapLine,
  RiEditLine,
  RiLockPasswordLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiCloseLine
} from "@remixicon/react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    classLevel: '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    cpassword: '',
  });

  const navigate = useNavigate();

  // جلب بيانات المستخدم
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('https://edu-master-psi.vercel.app/user/', {
          headers: { token },
        });

        const payload = response?.data;
        const userData = payload?.user || payload?.data || payload;

        setUser(userData);
        setFormData({
          name: userData.fullName || userData.name || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          classLevel: userData.classLevel || '',
        });
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError(err.response?.data?.message || 'Failed to fetch user profile');
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // تحديث بيانات المستخدم
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updateData = {
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        classLevel: formData.classLevel
      };

      const response = await axios.put(
        `https://edu-master-psi.vercel.app/user/${user._id}`,
        updateData,
        { headers: { token } }
      );

      const payload = response?.data;
      const updated = payload?.user || payload?.data || payload;
      setUser(updated);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // تحديث كلمة المرور
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.cpassword) {
      setError('New passwords do not match');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        'https://edu-master-psi.vercel.app/user/update-password',
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          cpassword: passwordData.cpassword,
        },
        { headers: { token } }
      );

      setIsChangingPassword(false);
      setPasswordData({ oldPassword: '', newPassword: '', cpassword: '' });
      alert('Password updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  // حذف الحساب
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete('https://edu-master-psi.vercel.app/user/', {
        headers: { token },
      });

      localStorage.removeItem('token');
      navigate('/login');
      alert('Account deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-15/70">جارِ تحميل الملف الشخصي...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-white-95 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiCloseLine className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-grey-15 mb-2">حدث خطأ</h3>
          <p className="text-grey-15/70 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="primary-btn">إعادة المحاولة</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-97">
      <div className="bg-white border-b border-white-95">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-grey-15 mb-2">الملف الشخصي</h1>
              <p className="text-grey-15/70">إدارة بيانات حسابك وتحديث كلمة المرور</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 grid md:grid-cols-3 gap-6">
        {/* Summary Card */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-white-95 p-6 h-max">
          <div className="w-16 h-16 bg-orange-90 rounded-full flex items-center justify-center mb-4">
            <RiUserLine className="w-8 h-8 text-orange-50" />
          </div>
          <h3 className="text-xl font-semibold text-grey-15 mb-1">{user.fullName || user.name}</h3>
          <p className="text-sm text-grey-15/60 mb-4">{user.role || 'USER'}</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-grey-15/80"><RiMailLine className="w-4 h-4" />{user.email}</div>
            <div className="flex items-center gap-2 text-grey-15/80"><RiPhoneLine className="w-4 h-4" />{user.phoneNumber || '—'}</div>
            <div className="flex items-center gap-2 text-grey-15/80"><RiGraduationCapLine className="w-4 h-4" />{user.classLevel || '—'}</div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-2">
            <button onClick={() => { setIsChangingPassword(false); setIsEditing(true); }} className="px-4 py-2 border border-white-95 rounded-lg hover:bg-white-95 inline-flex items-center gap-2">
              <RiEditLine className="w-4 h-4" /> تحديث البيانات
            </button>
            <button onClick={() => { setIsEditing(false); setIsChangingPassword(true); }} className="px-4 py-2 border border-white-95 rounded-lg hover:bg-white-95 inline-flex items-center gap-2">
              <RiLockPasswordLine className="w-4 h-4" /> تغيير كلمة المرور
            </button>
            <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 inline-flex items-center gap-2">
              <RiDeleteBinLine className="w-4 h-4" /> حذف الحساب
            </button>
          </div>
        </div>

        {/* Forms */}
        <div className="md:col-span-2 space-y-6">
          {!isEditing && !isChangingPassword && (
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
              <h3 className="text-lg font-semibold text-grey-15 mb-4">تفاصيل الحساب</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-white-97 rounded-lg"><span className="text-grey-15/60">الاسم</span><div className="font-medium">{user.fullName || user.name}</div></div>
                <div className="p-4 bg-white-97 rounded-lg"><span className="text-grey-15/60">البريد</span><div className="font-medium">{user.email}</div></div>
                <div className="p-4 bg-white-97 rounded-lg"><span className="text-grey-15/60">الهاتف</span><div className="font-medium">{user.phoneNumber || '—'}</div></div>
                <div className="p-4 bg-white-97 rounded-lg"><span className="text-grey-15/60">المستوى</span><div className="font-medium">{user.classLevel || '—'}</div></div>
              </div>
            </div>
          )}

          {isEditing && (
            <form onSubmit={handleUpdateProfile} className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
              <h3 className="text-lg font-semibold text-grey-15 mb-4">تحديث البيانات</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-grey-15/60 mb-1">الاسم</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50" />
                </div>
                <div>
                  <label className="block text-sm text-grey-15/60 mb-1">البريد الإلكتروني</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50" />
                </div>
                <div>
                  <label className="block text-sm text-grey-15/60 mb-1">الهاتف</label>
                  <input type="tel" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} className="w-full px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50" />
                </div>
                <div>
                  <label className="block text-sm text-grey-15/60 mb-1">المستوى</label>
                  <input type="text" value={formData.classLevel} onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })} className="w-full px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50" />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="submit" className="primary-btn inline-flex items-center gap-2"><RiCheckLine className="w-4 h-4" /> حفظ</button>
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-white-95 rounded-lg hover:bg-white-95 inline-flex items-center gap-2"><RiCloseLine className="w-4 h-4" /> إلغاء</button>
              </div>
            </form>
          )}

          {isChangingPassword && (
            <form onSubmit={handleUpdatePassword} className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
              <h3 className="text-lg font-semibold text-grey-15 mb-4">تغيير كلمة المرور</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm text-grey-15/60 mb-1">كلمة المرور الحالية</label>
                  <input type="password" placeholder="••••••••" value={passwordData.oldPassword} onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} required className="w-full px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm text-grey-15/60 mb-1">كلمة المرور الجديدة</label>
                  <input type="password" placeholder="••••••••" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required className="w-full px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-grey-15/60 mb-1">تأكيد كلمة المرور</label>
                  <input type="password" placeholder="••••••••" value={passwordData.cpassword} onChange={(e) => setPasswordData({ ...passwordData, cpassword: e.target.value })} required className="w-full px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50" />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="submit" className="primary-btn inline-flex items-center gap-2"><RiCheckLine className="w-4 h-4" /> تحديث</button>
                <button type="button" onClick={() => setIsChangingPassword(false)} className="px-4 py-2 border border-white-95 rounded-lg hover:bg-white-95 inline-flex items-center gap-2"><RiCloseLine className="w-4 h-4" /> إلغاء</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
