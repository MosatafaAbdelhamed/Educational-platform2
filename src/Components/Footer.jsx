import { Facebook, Twitter, Linkedin, Youtube, GraduationCap } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    "About Us": [
      { name: "Our Story", href: "/about" },
      { name: "Mission & Vision", href: "/mission" },
      { name: "Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    Courses: [
      { name: "Web Development", href: "/courses/web-development" },
      { name: "Data Science", href: "/courses/data-science" },
      { name: "Mobile Development", href: "/courses/mobile" },
      { name: "UI/UX Design", href: "/courses/design" },
      { name: "All Courses", href: "/courses" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Community", href: "/community" },
      { name: "Student Resources", href: "/resources" },
      { name: "Technical Support", href: "/support" },
    ],
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/skillpath" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/skillpath" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/skillpath" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/skillpath" },
  ]

  return (
<footer className="bg-gray-900 text-white border-t border-[var(--footer-border)] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--footer-foreground)]">SkillPath</h3>
                <p className="text-sm text-[var(--footer-muted)]">Educational Platform</p>
              </div>
            </div>
            <p className="text-[var(--footer-muted)] text-sm leading-relaxed max-w-md">
              Empowering learners worldwide with cutting-edge courses and expert instruction. Build your skills, advance
              your career, and unlock your potential with SkillPath.
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-base font-semibold text-[var(--footer-foreground)]">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--footer-muted)] hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media and Copyright Section */}
        <div className="mt-12 pt-8 border-t border-[var(--footer-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-[var(--footer-muted)]">
              © {currentYear} SkillPath Educational Platform. All rights reserved.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[var(--footer-muted)] mr-2">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
