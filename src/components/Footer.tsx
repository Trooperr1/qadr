import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'About', href: '#' },
      { label: 'Services', href: '#services' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Contact', href: '#contact' }
    ],
    services: [
      { label: '3D WebGL', href: '#' },
      { label: 'Interactive Design', href: '#' },
      { label: 'Motion Graphics', href: '#' },
      { label: 'Brand Identity', href: '#' }
    ],
    social: [
      { label: 'Twitter', href: '#', icon: '𝕏' },
      { label: 'LinkedIn', href: '#', icon: 'in' },
      { label: 'Dribbble', href: '#', icon: '⚡' },
      { label: 'GitHub', href: '#', icon: '</>' }
    ]
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">JAFFSTUDIO</h3>
            <p className="footer-tagline">
              Crafting immersive 3D digital experiences that push the boundaries of web design.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Connect</h4>
              <ul className="footer-links">
                {footerLinks.social.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>
                      <span className="social-icon">{link.icon}</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} JAFFSTUDIO. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="footer-gradient"></div>
    </footer>
  )
}
