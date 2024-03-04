import 'package:flutter_test/flutter_test.dart';
import 'package:patrol_finders/patrol_finders.dart';
import 'package:flutter_finder_usercentric/finder.dart';
import '_common.dart';

/// Usage: I should not see a button named {'My button'}
Future<void> iShouldNotSeeAButtonNamed(
    WidgetTester tester, String accessibleName) async {
  PatrolTester $ = getPatrolTester(tester);

  expect(
      $(find.byAccessibleRoleAndName(
          tester, AccessibleRole.button, accessibleName)),
      findsNothing);
}
