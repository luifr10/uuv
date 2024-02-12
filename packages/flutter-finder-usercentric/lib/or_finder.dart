part of flutter_finder_usercentric;

Finder finderOr(Finder finder1, Finder finder2, String? description) {
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
    description
  }) : super(find.byWidgetPredicate((widget) => true)) {
    // TODO: implement OrFinderLink
    this._description = description;
  }

  final Finder finder1;
  final Finder finder2;
  String? _description;

  @override
  String get description => _description != null ? _description! : 'Or [ ${finder1.description}, ${finder2.description} ]';


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