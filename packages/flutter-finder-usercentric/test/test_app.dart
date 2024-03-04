import 'package:flutter/material.dart';

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
