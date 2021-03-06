import { Events, Selectors } from '@storefront/core';
import Navigation from '../../src/navigation';
import suite from './_suite';

suite('Navigation', ({ expect, spy, itShouldBeConfigurable, itShouldProvideAlias }) => {
  let navigation: Navigation;

  beforeEach(() => (navigation = new Navigation()));

  itShouldBeConfigurable(Navigation);
  itShouldProvideAlias(Navigation, 'navigation');

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial values', () => {
        expect(navigation.props).to.eql({ display: {}, labels: {}, collapse: true });
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        expect(navigation.state).to.eql({ fields: [] });
      });
    });
  });

  describe('init()', () => {
    it('should listen for NAVIGATIONS_UPDATED and set up initial state', () => {
      const subscribe = (navigation.subscribe = spy());
      const fields = [1, 2, 3];
      const select = (navigation.select = spy(() => fields));
      const updateFields = (navigation.updateFields = spy());

      navigation.init();

      expect(subscribe).to.be.calledWith(Events.NAVIGATIONS_UPDATED, navigation.updateFields);
      expect(select).to.be.calledWithExactly(Selectors.navigationsObject);
      expect(updateFields).to.be.calledWithExactly(fields);
      expect(updateFields).to.be.calledOnce;
    });
  });

  describe('updateFields()', () => {
    const fields = ['a', 'b', 'c'];
    const display = { a: 'value', b: 'range' };
    const labels = { b: 'B', c: 'C' };
    const navigationsObject: any = { allIds: fields };
    let set;
    let select;

    beforeEach(() => {
      set = navigation.set = spy();
      select = navigation.select = spy(() => navigationsObject);
    });

    it('should set fields, with active set for the first x number of fields based on isActive', () => {
      navigation.props = <any>{ display, labels, collapse: { isActive: 2 } };

      navigation.updateFields(navigationsObject);

      expect(set).to.be.calledWith({
        fields: [
          { value: 'a', display: 'value', label: undefined, active: true },
          { value: 'b', display: 'range', label: 'B', active: true },
          { value: 'c', display: undefined, label: 'C', active: false },
        ],
      });
    });

    it('should set fields with active true when isActive true', () => {
      navigation.props = <any>{ display, labels, collapse: { isActive: true } };

      navigation.updateFields(navigationsObject);

      expect(set).to.be.calledWith({
        fields: [
          { value: 'a', display: 'value', label: undefined, active: true },
          { value: 'b', display: 'range', label: 'B', active: true },
          { value: 'c', display: undefined, label: 'C', active: true },
        ],
      });
    });

    it('should set fields with active false when isActive false', () => {
      navigation.props = <any>{ display, labels, collapse: { isActive: false } };

      navigation.updateFields(navigationsObject);

      expect(set).to.be.calledWith({
        fields: [
          { value: 'a', display: 'value', label: undefined, active: false },
          { value: 'b', display: 'range', label: 'B', active: false },
          { value: 'c', display: undefined, label: 'C', active: false },
        ],
      });
    });

    it('should set fields with active true when collapse true', () => {
      navigation.props = <any>{ display, labels, collapse: true };

      navigation.updateFields(navigationsObject);

      expect(set).to.be.calledWith({
        fields: [
          { value: 'a', display: 'value', label: undefined, active: true },
          { value: 'b', display: 'range', label: 'B', active: true },
          { value: 'c', display: undefined, label: 'C', active: true },
        ],
      });
    });

    it('should set fields with active true when collapse false', () => {
      navigation.props = <any>{ display, labels, collapse: false };

      navigation.updateFields(navigationsObject);

      expect(set).to.be.calledWith({
        fields: [
          { value: 'a', display: 'value', label: undefined, active: true },
          { value: 'b', display: 'range', label: 'B', active: true },
          { value: 'c', display: undefined, label: 'C', active: true },
        ],
      });
    });
  });
});
