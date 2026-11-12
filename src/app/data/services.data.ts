import { Service } from "../model/service.model";

export const services: Service[] = [
  {
    slug: "landing-pages",
    icon: "tablerDeviceDesktop",
    nameKey: "servicesPage.landingPages.name",
    descriptionKey: "servicesPage.landingPages.shortDescription",
    taglineKey: "servicesPage.landingPages.tagline",
  },
  {
    slug: "sites-para-autonomos",
    icon: "tablerGlobe",
    nameKey: "servicesPage.websitesForFreelancers.name",
    descriptionKey: "servicesPage.websitesForFreelancers.shortDescription",
    taglineKey: "servicesPage.websitesForFreelancers.tagline",
  },
  {
    slug: "blogs-e-portfolios",
    icon: "tablerPencil",
    nameKey: "servicesPage.blogsAndPortfolios.name",
    descriptionKey: "servicesPage.blogsAndPortfolios.shortDescription",
    taglineKey: "servicesPage.blogsAndPortfolios.tagline",
  },
  {
    slug: "integracoes",
    icon: "tablerPlugConnected",
    nameKey: "servicesPage.integrations.name",
    descriptionKey: "servicesPage.integrations.shortDescription",
    taglineKey: "servicesPage.integrations.tagline",
  },
];
