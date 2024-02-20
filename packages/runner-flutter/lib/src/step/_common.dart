import 'package:flutter_test/flutter_test.dart';
import 'package:patrol_finders/patrol_finders.dart';

PatrolTester getPatrolTester(WidgetTester tester) {
  PatrolTester $ = PatrolTester(
    tester: tester,
    config: const PatrolTesterConfig(),
  );
  return $;
}