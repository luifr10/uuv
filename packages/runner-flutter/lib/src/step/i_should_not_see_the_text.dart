import 'package:flutter_test/flutter_test.dart';

/// Usage: I should not see the text {'Todo List'}
Future<void> iShouldNotSeeTheText(WidgetTester tester, String text) async {
  expect(find.text(text), findsNothing);
}
