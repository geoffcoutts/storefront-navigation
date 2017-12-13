import {
  alias,
  tag,
  Events,
  ProductTransformer,
  Selectors,
  Store,
  StoreSections,
  Structure,
  Tag
} from '@storefront/core';

@alias('refinementPillsCategory')
@tag('gb-refinement-pills-category', require('./index.html'))
class RefinementPillCategory {
  props: RefinementPillCategory.Props = <any>{};

  state: RefinementPillCategory.State = <any>{ refinements: [], };

  init() {
    this.updateState();
  }

  onUpdate() {
    this.updateState();
  }

  updateState() {
    const navigation = this.props.navigation;
    const isNavigationValid = navigation && navigation.refinements && navigation.selected;
    /* istanbul ignore next */
    let action: Function = () => null;
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        action = this.actions.resetPastPurchaseQueryAndSelectRefinement;
        break;
    }

    if (isNavigationValid) {
      navigation.refinements = navigation.refinements.map((value, index) => ({
        ...value,
        selected: navigation.selected.some((i) => i === index),
      }));
    }

    const refinements = isNavigationValid ? navigation.refinements.map((refinement, index) => {
      return {
        ...refinement,
        onClick: (() => refinement['onClick'] ?
          refinement['onClick']() : action(navigation.field, index)),
      };
    }) : [];

    this.state = { refinements, navigation };
  }
}

interface RefinementPillCategory extends Tag<RefinementPillCategory.Props, RefinementPillCategory.State> { }
export namespace RefinementPillCategory {
  export interface Props extends Tag.Props {
    navigation: Store.Navigation;
  }

  export interface State {
    navigation: Store.Navigation;
    refinements: Store.Refinement[];
  }
}

export default RefinementPillCategory;
