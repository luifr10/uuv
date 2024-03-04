import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_finder_usercentric/finder.dart';

class TestApp extends StatelessWidget {
  TestApp({super.key});
  final controller = TextEditingController();
  final double _currentSliderValue = 20;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Test App',
      home: Scaffold(
        body: Column(
          children: [
            TextField(
                key: const Key('SimpleTextFieldKey'),
                controller: controller,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: 'Simple TextField',
                )
            ),
            TextField(
                key: const Key('AnotherSimpleTextFieldKey'),
                controller: controller,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: 'Another Simple TextField',
                )
            ),
            MergeSemantics(
              key: const Key("SimpleSliderKey"),
              child: Row(
                children: [
                  const Text("Simple slider"),
                  Slider(
                    value: _currentSliderValue,
                    max: 100,
                    divisions: 5,
                    label: _currentSliderValue.round().toString(),
                    onChanged: (double value) {
                    },
                  )
                ],
              ),
            ),
            FloatingActionButton(
              key: const Key('SimpleFloatingActionButtonTooltipKey'),
              tooltip: 'SimpleFloatingActionButtonTooltip',
              onPressed: () {},
            ),
            ElevatedButton(
                onPressed: () {},
                key: const Key('SimpleElevatedButtonKey'),
                child: const Text('SimpleElevatedButtonText')
            ),
            Tooltip(
                message: "ElevatedButtonWithTooltip",
                child: ElevatedButton(
                    onPressed: () {},
                    key: const Key('ElevatedButtonWithTooltipKey'),
                    child: const Text('ElevatedButtonWithTooltipText')
                )
            )
          ],
        ),
      ),
    );
  }
}

void main() {
  testWidgets('byAccessibleName should return element when text content found', (tester) async {
    await tester.pumpWidget(TestApp());

    var finderByAccessibleName = find.byAccessibleName("SimpleElevatedButtonText");
    expect(finderByAccessibleName, findsOneWidget);
    expectKey(finderByAccessibleName, "ElevatedButton", "SimpleElevatedButtonKey");
  });

  testWidgets('byAccessibleName should return element when tooltip found', (tester) async {
    await tester.pumpWidget(TestApp());

    var finderByAccessibleName = find.byAccessibleName("ElevatedButtonWithTooltip");
    expect(finderByAccessibleName, findsOneWidget);
    expect((tester.widget(finderByAccessibleName) as Tooltip).message, "ElevatedButtonWithTooltip");
  });

  testWidgets('byAccessibleName should return empty when no element found', (tester) async {
    await tester.pumpWidget(TestApp());

    var finderByAccessibleName = find.byAccessibleName("NonExisting");
    expect(finderByAccessibleName, findsNothing);
  });

  testWidgets('byAccessibleRoleAndName should return ElevatedButton when found', (tester) async {
    await tester.pumpWidget(TestApp());

    var finderByAccessibleRoleAndName = find.byAccessibleRoleAndName(tester, AccessibleRole.button, "SimpleElevatedButtonText");
    expect(finderByAccessibleRoleAndName, findsOneWidget);
    expectKey(finderByAccessibleRoleAndName, "ElevatedButton", "SimpleElevatedButtonKey");
  });

  testWidgets('byAccessibleRoleAndName should return TextField when found', (tester) async {
    await tester.pumpWidget(TestApp());

    var finderByAccessibleRoleAndName = find.byAccessibleRoleAndName(tester, AccessibleRole.textField, "Simple TextField");
    expect(finderByAccessibleRoleAndName, findsOneWidget);
    expectKey(finderByAccessibleRoleAndName, "TextField", "SimpleTextFieldKey");
  });

  testWidgets('byAccessibleRoleAndName should return Slider when found', (tester) async {
    await tester.pumpWidget(TestApp());
    debugDumpSemanticsTree();

    var finderByAccessibleRoleAndName = find.byAccessibleRoleAndName(tester, AccessibleRole.slider, "Simple slider");
    expect(finderByAccessibleRoleAndName, findsOneWidget);
    expect(finderByAccessibleRoleAndName.found.first.widget.key, const Key("SimpleSliderKey"));
  });

  testWidgets('byAccessibleRoleAndName should return empty when accessible role doesn\'t match with existing text', (tester) async {
    await tester.pumpWidget(TestApp());

    var finderByAccessibleRoleAndName = find.byAccessibleRoleAndName(tester, AccessibleRole.textField, "SimpleElevatedButtonText");
    expect(finderByAccessibleRoleAndName, findsNothing);
  });

  testWidgets('byAccessibleRoleAndName should return element for floatingButton', (tester) async {
    await tester.pumpWidget(TestApp());

    var finderByAccessibleRoleAndName = find.byAccessibleRoleAndName(tester, AccessibleRole.button, "SimpleFloatingActionButtonTooltip");
    expect(finderByAccessibleRoleAndName, findsOneWidget);
    expect((tester.widget(finderByAccessibleRoleAndName) as Tooltip).message, "SimpleFloatingActionButtonTooltip");
  });

  testWidgets('byAccessibleRoleAndName should return empty when accessible role doesn\'t match with existing tooltip', (tester) async {
    await tester.pumpWidget(TestApp());

    var finderByAccessibleRoleAndName = find.byAccessibleRoleAndName(tester, AccessibleRole.textField, "SimpleFloatingActionButtonTooltip");
    expect(finderByAccessibleRoleAndName, findsNothing);
  });

  testWidgets('byAccessibleRoleAndName should return empty when text button not found', (tester) async {
    await tester.pumpWidget(TestApp());

    var finderByAccessibleRoleAndName = find.byAccessibleRoleAndName(tester, AccessibleRole.button, "NonExisting");
    expect(finderByAccessibleRoleAndName, findsNothing);
  });
}

void expectKey(Finder finder, String type, String key) {
  expect(
      find.ancestor(
          of: finder,
          matching: find.byWidgetPredicate(
                  (widget) =>
              widget.runtimeType.toString() == type && widget.key == Key(key)
          )
      ),
      findsOneWidget
  );
}
