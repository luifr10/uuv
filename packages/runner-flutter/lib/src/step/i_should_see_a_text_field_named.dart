import 'package:flutter_test/flutter_test.dart';
import 'package:patrol_finders/patrol_finders.dart';
import 'package:flutter_finder_usercentric/finder.dart';
import '_common.dart';

/// Usage: I should see a text field named {'a TextField'}
Future<void> iShouldSeeATextFieldNamed(
    WidgetTester tester, String accessibleName) async {
  PatrolTester $ = getPatrolTester(tester);

  expect(
      $(find.byAccessibleRoleAndName(
          tester, AccessibleRole.textField, accessibleName)),
      findsOneWidget);
}
