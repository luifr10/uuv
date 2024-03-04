part of 'finder.dart';

Finder finderOr(Finder finder1, Finder finder2, String description) {
  return OrFinderLink(
    finder1: finder1,
    finder2: finder2,
    description: description
  );
}

class OrFinderLink extends ChainedFinder {
  OrFinderLink({
    required this.finder1,
    required this.finder2,
    required this.description
  }) : super(find.byWidgetPredicate((widget) => true));

  final Finder finder1;
  final Finder finder2;
  @override
  final String description;

  @override
  Iterable<Element> filter(Iterable<Element> parentCandidates) {
    if(finder1.tryEvaluate() && finder1.hasFound) {
      return finder1.found;
    }

    if(finder2.tryEvaluate() && finder2.hasFound) {
      return finder2.found;
    }

    return [];
  }
}