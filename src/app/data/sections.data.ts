import { NavItem } from "../model/nav-item.model";

export const sections: NavItem[] = [
  { href: "#home", titleKey: "home.nav.home" },
  { href: "#services", titleKey: "home.nav.services" },
  { href: "#whyMe", titleKey: "home.nav.whyMe" },
  { href: "#projects", titleKey: "home.nav.projects" },
  { href: "#testimonials", titleKey: "home.nav.testimonials" },
];

export const serviceLinks: NavItem[] = [
  { href: "/services/landing-pages", titleKey: "home.services.landingPages" },
  { href: "/services/sites-para-autonomos", titleKey: "home.services.websitesForFreelancers" },
  { href: "/services/blogs-e-portfolios", titleKey: "home.services.blogsAndPortofolios" },
  { href: "/services/integracoes", titleKey: "home.services.integrations" },
];
