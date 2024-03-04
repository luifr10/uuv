# FLUTTER_FINDER_USERCENTRIC
Flutter finder to find element based on their semantic role(button, textfield, etc) and semantic label 

## How to use it ?
```dart
  testWidgets('byAccessibleName should return element when tooltip found', (tester) async {
        await tester.pumpWidget(TestApp());
        
        var finderByAccessibleName = find.byAccessibleName("ElevatedButtonWithTooltip");
        expect(finderByAccessibleName, findsOneWidget);
        expect((tester.widget(finderByAccessibleName) as Tooltip).message, "ElevatedButtonWithTooltip");
  });
    
  testWidgets('byAccessibleRoleAndName should return ElevatedButton when found', (tester) async {
        await tester.pumpWidget(TestApp());
        
        var finderByAccessibleRoleAndName = find.byAccessibleRoleAndName(tester, AccessibleRole.button, "SimpleElevatedButtonText");
        expect(finderByAccessibleRoleAndName, findsOneWidget);
  });
```

For more example [there](./packages/flutter-finder-usercentric/test/test_app.dart).