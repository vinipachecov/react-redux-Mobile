import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class LibraryList extends Component {
    componentWillMount() {
        //tel what data we will use inside the list
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.DataSource = ds.cloneWithRows(this.props.libraries);
    }

    //how to handle a single element in our app
    renderRow(library) {
        return <ListItem library={library} />;
    }

    render() {        
        return (
            <ListView 
                dataSource={this.DataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

//function that send data from our store to our librarylist component
// i.e our react component
const mapStateToProps = state => {
    return { libraries: state.libraries };
};

export default connect(mapStateToProps)(LibraryList);
