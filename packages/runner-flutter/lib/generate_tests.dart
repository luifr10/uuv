library runner_flutter;

import 'dart:async';

import 'package:build/build.dart';
import 'package:bdd_widget_test/bdd_widget_test.dart';
// ignore: implementation_imports
import 'package:bdd_widget_test/src/generator_options.dart';

Builder generateTests(BuilderOptions options) => GenerateTestsBuilder(
  GeneratorOptions.fromMap(options.config),
);

class GenerateTestsBuilder implements Builder {
  late Builder bddTestBuilder;

  GenerateTestsBuilder(GeneratorOptions options) {
    bddTestBuilder = FeatureBuilder(
        GeneratorOptions.fromMap({
          'testerName': '\$',
          'testerType': 'PatrolIntegrationTester',
          'externalSteps': [
            'package:uuv_flutter/src/step/i_see_text.dart',
            'package:uuv_flutter/src/step/i_should_see_a_button_named.dart',
            'package:uuv_flutter/src/step/i_should_not_see_a_button_named.dart',
            'package:uuv_flutter/src/step/i_should_see_a_text_field_named.dart',
            'package:uuv_flutter/src/step/i_should_see_a_title_named.dart',
            'package:uuv_flutter/src/step/i_tap_on_a_button_named.dart'
          ]
        })
    );
  }

  @override
  FutureOr<void> build(BuildStep buildStep) {
    return bddTestBuilder.build(buildStep);
  }

  @override
  final buildExtensions = const {
    '.feature': ['_test.dart'],
  };
}