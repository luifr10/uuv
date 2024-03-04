part of 'finder.dart';

/// Find widget by accessible role and accessible name
Finder finderByAccessibleRoleAndName(WidgetTester tester, AccessibleRole accessibleRole, String accessibleName) {
  return find.or(
      find.ancestor(
          of: find.byAccessibleName(accessibleName),
          matching: find.byWidgetPredicate((widget) => widget is Semantics && doesWidgetHaveAccessibleRole(tester, widget, accessibleRole)
          ),
          matchRoot: true
      ),
      find.ancestor(
          of: find.byWidgetPredicate((widget) => widget is Semantics
              && doesWidgetHaveAccessibleRole(tester, widget, accessibleRole)
          ),
          matching: find.or(
            find.byTooltip(accessibleName),
            find.byAccessibleName(accessibleName),
              "find by tootip or accessible name '$accessibleName'"
          ),
          matchRoot: true
      ),
      "find by role '$accessibleRole' and accessible name '$accessibleName'"
  );
}

/// Returns True if input widget have the specified semantic role, else False
bool doesWidgetHaveAccessibleRole(WidgetTester tester, Semantics widget, AccessibleRole accessibleRole) {
  switch(accessibleRole) {
    case AccessibleRole.button:
      return widget.properties.button == true;
    case AccessibleRole.header:
      return widget.properties.header == true;
    case AccessibleRole.link:
      return widget.properties.link == true;
    case AccessibleRole.slider:
      return widget.properties.slider == true;
    case AccessibleRole.textField:
      Finder finder = find.byWidget(widget);
      finder.tryEvaluate();
      SemanticsNode widgetSemantics = tester.getSemantics(finder);
      return widgetSemantics.hasFlag(SemanticsFlag.isTextField);
    default:
      return false;
  }
}

/// List of available accessible role
enum AccessibleRole {
  button,
  link,
  header,
  textField,
  slider,
}
