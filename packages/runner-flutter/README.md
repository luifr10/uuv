
# UUV_FLUTTER
An accessibility driven solution to facilitate the writing and execution of E2E tests understandable by any human being using cucumber(BDD) and flutter

## Create or edit the build.yaml file at the root of your project
```yaml  
targets:  
	$default:  
		sources:  
			- integration_test/** # By default, build runner will not generate code in the integration folder  
			- test/** # so we override paths for code generation here  
			- lib/**  
			- $package$  
		builders:  
			bdd_widget_test|featureBuilder:  
				enabled: false  
			uuv_flutter|generateTests:  
				enabled: true  
```  

## Write your tests
Create a test file `integration_test/first-test.feature`
```gherkin  
Feature: Panoramax mobile App  
  
	Scenario: Homepage  
		Given the app is running  
		Then I should see a title named {'Your sequences'}  
		And I should see a button named {'Create a new sequence'}  
  
	Scenario: Capture page  
		Given the app is running  
		When I tap on a button named {'Create a new sequence'}  
		Then I should see a button named {'Take a picture'}  
		And I should see a button named {'Switch camera'}  
		And I should see a button named {'Create a new sequence with captured pictures'}  
```  

## Available sentences
### `I see {'text'} text`
Checks that the specified text is present

### `I should see a button named {'My button'}`
Checks that a button exists with the specified [accessible name](https://pub.dev/packages/flutter_finder_usercentric)

### `I should not see a button named {'My button'}`
Checks that a button does not exist with the specified [accessible name](https://pub.dev/packages/flutter_finder_usercentric)

### `I tap on a button named {'My button'}`
Tap on a button with the specified [accessible name](https://pub.dev/packages/flutter_finder_usercentric)

### `I should see a text field named {'a TextField'}`
Checks that a text field exists with the specified [accessible name](https://pub.dev/packages/flutter_finder_usercentric)

### `I should see a title named {'First title'}`
Checks that a title exists with the specified [accessible name](https://pub.dev/packages/flutter_finder_usercentric)

## Generate test files from feature files
### One shot
```shell  
dart run build_runner build --delete-conflicting-outputs
```  

### Watch change
```shell  
dart run build_runner watch --delete-conflicting-outputs
```

## Implement generated step `the app is running`
Edit the generated file `integration_test/step/the_app_is_running.dart` to start your app during the step :
```dart  
import 'package:flutter_test/flutter_test.dart';  
import 'package:panoramax_mobile/main.dart'; // <-- Replace this path  
  
Future<void> theAppIsRunning(WidgetTester tester) async {  
  await tester.pumpWidget(const PanoramaxApp()); // <-- Replace PanoramaxApp by your app  
}  
```

## Run generated tests
```shell  
flutter test integration_test
```
