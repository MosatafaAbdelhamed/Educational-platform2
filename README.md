# SkillBridge - Educational Platform

A modern, responsive educational platform built with React and Vite. SkillBridge provides a comprehensive learning experience with courses, exams, lessons, and user management features.

## 🚀 Features

### 🎓 Learning Management
- **Interactive Courses**: Browse and enroll in various courses
- **Lesson Management**: Access detailed lessons with progress tracking
- **Exam System**: Take timed exams with instant results
- **Progress Tracking**: Monitor your learning journey

### 👥 User Management
- **Student Dashboard**: Personalized learning experience
- **Admin Panel**: Complete platform management
- **Role-based Access**: Different permissions for students and admins
- **User Profiles**: Comprehensive user information management

### 🔐 Authentication
- **Secure Login/Register**: Modern authentication system
- **Password Recovery**: Forgot password functionality
- **Social Login**: Google and Facebook integration
- **Session Management**: Secure token-based authentication

### 📱 Modern UI/UX
- **Responsive Design**: Works perfectly on all devices
- **Modern Interface**: Clean, intuitive design with Tailwind CSS
- **Interactive Elements**: Smooth animations and transitions
- **Accessibility**: WCAG compliant design

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.6
- **Styling**: Tailwind CSS 4.1.13
- **Routing**: React Router DOM 7.9.1
- **Icons**: Remix Icon 4.6.0
- **HTTP Client**: Axios 1.12.2
- **Code Quality**: ESLint 9.35.0

## 📁 Project Structure

```
src/
├── Components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   ├── Navbar.jsx      # Mobile navigation
│   └── Loader.jsx      # Loading component
├── assets/
│   └── Pages/          # Page components
│       ├── Home.jsx    # Landing page
│       ├── Courses.jsx # Course listing
│       ├── About.jsx   # About page
│       ├── Pricing.jsx # Pricing plans
│       ├── Contact.jsx # Contact form
│       ├── Auth/       # Authentication pages
│       ├── Admin/      # Admin panel pages
│       ├── Exams/      # Exam management
│       ├── Lessons/    # Lesson management
│       └── Questions/  # Question management
├── Constant/
│   └── data.js         # Static data and configuration
└── main.jsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Educational-platform1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#ff9500` - Main brand color
- **Background**: `#f7f7f8` - Light background
- **Text**: `#262625` - Dark text color
- **White**: `#fcfcfd` - Pure white backgrounds

### Typography
- **Font Family**: DM Sans
- **Headings**: Bold, responsive sizing
- **Body Text**: Regular weight, optimized for readability

### Components
- **Buttons**: Primary and secondary variants with hover effects
- **Cards**: Rounded corners with subtle shadows
- **Forms**: Clean inputs with focus states
- **Navigation**: Responsive header with mobile menu

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Implemented

### Home Page
- Hero section with call-to-action
- Featured courses showcase
- Benefits and testimonials
- FAQ section
- Newsletter signup

### Course Management
- Course browsing with filters
- Search functionality
- Course details with enrollment
- Progress tracking

### User Authentication
- Modern login/register forms
- Password strength indicator
- Social authentication buttons
- Form validation and error handling

### Admin Features
- User management
- Course creation and editing
- Exam and question management
- Analytics dashboard

## 🚀 Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm run build
# Deploy the dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload the dist folder to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Remix Icons](https://remixicon.com/) for the beautiful icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [React](https://reactjs.org/) for the amazing UI library

---

**Made with ❤️ for learners worldwide**
