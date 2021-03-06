import { provide, tag, Events, Selectors, Tag } from '@storefront/core';
import RefinementControls from '../refinement-controls';

@provide('navigationDisplay')
@tag('gb-navigation-display', require('./index.html'))
class NavigationDisplay {
  props: NavigationDisplay.Props = {
    icons: {
      toggleOpen: 'gb-icon__minus',
      toggleClosed: 'gb-icon__plus',
    },
  } as NavigationDisplay.Props;
  state: NavigationDisplay.State = {
    isActive: true,
  } as NavigationDisplay.State;

  headerProps() {
    const { collapse, icons } = this.props;
    const { isActive, label } = this.state;
    return { collapse, icons, isActive, label, onToggle: this.onToggle };
  }

  init() {
    const tagName = Tag.getMeta(this).name;
    const uiState = this.select(Selectors.uiTagState, tagName, this.props.field.value);

    this.flux.on(`${Events.UI_UPDATED}:${tagName}:${this.props.field.value}`, this.updateIsActive);

    this.updateField(this.props.field);
    this.state = {
      ...this.state,
      isActive: uiState ? uiState.isActive : this.props.field.active,
    };
  }

  onUpdate() {
    this.updateField(this.props.field);
  }

  onUnmount() {
    this.flux.off(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.state.value}`, this.updateNavigation);
  }

  updateIsActive = ({ isActive }: NavigationDisplay.State) => this.set({ isActive });

  updateField(field: NavigationDisplay.Field) {
    const navigation = this.selectNavigation(field.value);
    const label = field.label || navigation.label || field.value;

    this.flux.off(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.state.value}`, this.updateNavigation);
    this.root.classList.remove(`gb-navigation-${this.state.value}`);
    this.state = { ...this.state, ...field, label, navigation };
    this.root.classList.add(`gb-navigation-${field.value}`);
    this.flux.on(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field.value}`, this.updateNavigation);
  }

  selectNavigation(field: string): RefinementControls.SelectedNavigation {
    const transformRefinement = (refinement, index) => ({
      ...refinement,
      index,
      or: navigation.or,
      range: navigation.range,
      selected: navigation.selected.includes(index),
    });

    const navigation = this.select(Selectors.navigation, field);
    const refinements = navigation.show
      ? navigation.show.map((i) => transformRefinement(navigation.refinements[i], i))
      : navigation.refinements.map(transformRefinement);

    return <any>{
      ...navigation,
      refinements
    };
  }

  updateNavigation = () => this.set({ navigation: this.selectNavigation(this.state.value) });

  onToggle = () =>
    this.actions.createComponentState(Tag.getMeta(this).name, this.props.field.value, {
      isActive: !this.state.isActive,
    });
}

interface NavigationDisplay extends Tag<NavigationDisplay.Props, NavigationDisplay.State> {}
namespace NavigationDisplay {
  export interface Props extends Tag.Props {
    collapse: boolean;
    field: Field;
    icons: Icons;
  }

  export interface State extends Field {
    isActive: boolean;
    navigation: RefinementControls.SelectedNavigation;
  }

  export interface Icons {
    toggleOpen: string;
    toggleClosed: string;
  }

  export type Display = 'value' | 'range' | 'filter';

  export interface Field {
    value: string;
    display: Display;
    label: string;
    active: boolean;
  }
}

export default NavigationDisplay;
