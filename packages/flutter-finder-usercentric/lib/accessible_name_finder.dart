part of 'finder.dart';

/// Find widget by accessible name
Finder finderByAccessibleName(String accessibleName) {
  return find.or(
      find.or(
        find.bySemanticsLabel(accessibleName),
        find.byTooltip(accessibleName.toString()),
        "find by SemanticLabel or Tooltip '$accessibleName'"
      ),
      find.text(accessibleName.toString()),
      "find by accessible name '$accessibleName'"
  );
}