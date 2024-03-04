import 'package:flutter_test/flutter_test.dart';
import '../main.dart';

Future<void> theAppIsRunning(WidgetTester tester) async {
  await tester.pumpWidget(const TodoList());
}
