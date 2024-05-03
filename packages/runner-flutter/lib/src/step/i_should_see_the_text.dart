import 'package:flutter_test/flutter_test.dart';

/// Usage: I should see the text {'Todo List'}
Future<void> iShouldSeeTheText(WidgetTester tester, String text) async {
  expect(find.text(text), findsOneWidget);
}
