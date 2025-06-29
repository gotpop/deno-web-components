import { FEATURE_ORDER, extractPageIndexFromPath } from "./page-index.js";

import { logger } from "../utils/logger.js";

export function determineTransitionType(
  fromNavigationEntry,
  toNavigationEntry
) {
  const currentURL = new URL(fromNavigationEntry.url);
  const destinationURL = new URL(toNavigationEntry.url);

  const currentPathname = currentURL.pathname;
  const destinationPathname = destinationURL.pathname;

  if (currentPathname === destinationPathname) {
    return "reload";
  } else {
    const currentPageIndex = extractPageIndexFromPath(currentPathname);
    logger.debug("currentPageIndex:", currentPageIndex);
    const destinationPageIndex = extractPageIndexFromPath(destinationPathname);
    logger.debug("destinationPageIndex:", destinationPageIndex);

    // Check for entering/exiting subpages
    const isCurrentMainPage =
      currentPageIndex < 400 || currentPageIndex === 999;
    const isDestinationMainPage =
      destinationPageIndex < 400 || destinationPageIndex === 999;
    const isCurrentFeature = currentPageIndex >= 400 && currentPageIndex < 999;
    const isDestinationFeature =
      destinationPageIndex >= 400 && destinationPageIndex < 999;

    // Entering a subpage (going from main page to feature)
    if (isCurrentMainPage && isDestinationFeature) {
      return "enter-subpage";
    }

    // Exiting a subpage (going from feature to main page)
    if (isCurrentFeature && isDestinationMainPage) {
      return "exit-subpage";
    }

    // Handle circular navigation for features
    if (isCurrentFeature && isDestinationFeature) {
      const currentFeatureIndex = currentPageIndex - 400;
      const destinationFeatureIndex = destinationPageIndex - 400;
      const totalFeatures = FEATURE_ORDER.length;

      // Calculate the shortest path considering circular navigation
      const forwardDistance =
        (destinationFeatureIndex - currentFeatureIndex + totalFeatures) %
        totalFeatures;
      const backwardDistance =
        (currentFeatureIndex - destinationFeatureIndex + totalFeatures) %
        totalFeatures;

      logger.debug("forwardDistance:", forwardDistance);
      logger.debug("backwardDistance:", backwardDistance);

      // If forward distance is shorter or equal, go forwards; otherwise go backwards
      if (forwardDistance <= backwardDistance) {
        return "forwards";
      } else {
        return "backwards";
      }
    }

    // Handle regular navigation (non-circular)
    if (currentPageIndex > destinationPageIndex) {
      return "backwards";
    }
    if (currentPageIndex < destinationPageIndex) {
      return "forwards";
    }

    return "unknown";
  }
}
