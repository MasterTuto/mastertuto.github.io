import { Service } from '../model/service.model';
import { landings } from '../screens/services/landings/landings.registry';

/** The twelve service categories, as menus and cards list them. Words live in `serviceCatalog`. */
export const services: Service[] = landings.map((landing) => ({
  slug: landing.slug,
  icon: landing.icon,
  nameKey: `serviceCatalog.${landing.key}.name`,
  descriptionKey: `serviceCatalog.${landing.key}.short`,
  taglineKey: `serviceCatalog.${landing.key}.tagline`,
}));
