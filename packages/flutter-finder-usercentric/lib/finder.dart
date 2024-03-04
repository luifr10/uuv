library flutter_finder_usercentric;

import 'package:flutter/semantics.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';

part 'or_finder.dart';
part 'accessible_name_finder.dart';
part 'accessible_name_and_role_finder.dart';

/// Custom finder declaration
extension CommonFinderX on CommonFinders {
  Finder or(Finder finder1, Finder finder2, String description) => finderOr(finder1, finder2, description);
  Finder byAccessibleName(String accessibleName) => finderByAccessibleName(accessibleName);
  Finder byAccessibleRoleAndName(WidgetTester tester, AccessibleRole accessibleRole, String accessibleName) => finderByAccessibleRoleAndName(tester, accessibleRole, accessibleName);
}