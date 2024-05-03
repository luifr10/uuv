import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

/// Usage: I put the device in portrait mode
Future<void> iPutTheDeviceInPortraitMode(WidgetTester tester) async {
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);
}
