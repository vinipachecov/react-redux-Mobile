import React, { Component } from 'react';
import { 
    Text,
    View,
    TouchableWithoutFeedback,
    LayoutAnimation,
    UIManager,
    Platform
 } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions/';

class ListItem extends Component {

    //To enable Layout animations on Android
    constructor() {
        super();
    
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    // do a fancy drop in the text section
    componentWillUpdate() {    
        LayoutAnimation.spring();
    }

    renderDescription() {
        const { library, expanded } = this.props;

        if (expanded) {
            return (
                <CardSection>
                    <Text style={{ flex: 1, paddingLeft: 15 }}>{library.description}</Text>
                </CardSection>
            );
        }
    }


    render() {
        const { titleStyle } = styles;
        const { id, title } = this.props.library;       

      return (
          <TouchableWithoutFeedback
            onPress={() => this.props.selectLibrary(id)}
          >
              <View>
                <CardSection>
                    <Text
                    style={titleStyle}
                    >
                    {title}
                    </Text>
                </CardSection>
                {this.renderDescription()}
            </View>        
          </TouchableWithoutFeedback>
      );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,        
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;
    
    return { expanded };
};

// in the connect function we have first our function to map props 
export default connect(mapStateToProps, actions)(ListItem);
