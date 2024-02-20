import 'package:flutter_test/flutter_test.dart';
import 'package:uuv_flutter/main.dart';

Future<void> theAppIsRunning(WidgetTester tester) async {
  await tester.pumpWidget(const TodoList());
}
