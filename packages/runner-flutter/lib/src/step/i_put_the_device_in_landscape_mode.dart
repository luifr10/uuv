import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

/// Usage: I put the device in landscape mode
Future<void> iPutTheDeviceInLandscapeMode(WidgetTester tester) async {
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.landscapeLeft,
  ]);
}
