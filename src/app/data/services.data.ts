import { Service } from "../model/service.model";

export const services: Service[] = [
  {
    slug: "landing-pages",
    i18nBase: "servicesPage.landingPages",
    icon: "tablerDeviceDesktop",
    nameKey: "servicesPage.landingPages.name",
    descriptionKey: "servicesPage.landingPages.shortDescription",
    taglineKey: "servicesPage.landingPages.tagline",
  },
  {
    slug: "sites-para-autonomos",
    i18nBase: "servicesPage.websitesForFreelancers",
    icon: "tablerGlobe",
    nameKey: "servicesPage.websitesForFreelancers.name",
    descriptionKey: "servicesPage.websitesForFreelancers.shortDescription",
    taglineKey: "servicesPage.websitesForFreelancers.tagline",
  },
  {
    slug: "blogs-e-portfolios",
    i18nBase: "servicesPage.blogsAndPortfolios",
    icon: "tablerPencil",
    nameKey: "servicesPage.blogsAndPortfolios.name",
    descriptionKey: "servicesPage.blogsAndPortfolios.shortDescription",
    taglineKey: "servicesPage.blogsAndPortfolios.tagline",
  },
  {
    slug: "integracoes",
    i18nBase: "servicesPage.integrations",
    icon: "tablerPlugConnected",
    nameKey: "servicesPage.integrations.name",
    descriptionKey: "servicesPage.integrations.shortDescription",
    taglineKey: "servicesPage.integrations.tagline",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
