import { NavItem } from "../model/nav-item.model";

export const sections: NavItem[] = [
  { href: "#home", titleKey: "home.nav.home" },
  { href: "#services", titleKey: "home.nav.services" },
  { href: "#whyMe", titleKey: "home.nav.whyMe" },
  { href: "#projects", titleKey: "home.nav.projects" },
  { href: "#testimonials", titleKey: "home.nav.testimonials" },
];

export type ServiceLink = NavItem & { slug: string };

export const serviceLinks: ServiceLink[] = [
  { href: "/services/landing-pages", slug: "landing-pages", titleKey: "home.services.landingPages" },
  { href: "/services/sites-para-autonomos", slug: "sites-para-autonomos", titleKey: "home.services.websitesForFreelancers" },
  { href: "/services/blogs-e-portfolios", slug: "blogs-e-portfolios", titleKey: "home.services.blogsAndPortofolios" },
  { href: "/services/integracoes", slug: "integracoes", titleKey: "home.services.integrations" },
];
