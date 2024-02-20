import 'package:flutter_test/flutter_test.dart';
import 'package:patrol_finders/patrol_finders.dart';
import 'package:flutter_finder_usercentric/finder.dart';
import '_common.dart';

/// Usage: I tap on a button named {'My button'}
Future<void> iTapOnAButtonNamed(WidgetTester tester, String accessibleName) async {
  PatrolTester $ = getPatrolTester(tester);
  await $(find.byAccessibleRoleAndName(tester, AccessibleRole.button, accessibleName)).tap();
}
