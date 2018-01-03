import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
 
class AlbumList extends Component {
    //update what our component shows or holdes
    // trigger for user event
    state = { albums: [] };
                                                      
    componentWillMount() {
        console.log('ComponentWillMount in AlbumList');                
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => this.setState({ albums: response.data }));                     
    }

    renderAlbums() {        

        // album as a prop inside AlbumDetail
        return this.state.albums.map(album => 
        <AlbumDetail key={album.title} album={album}/> 
        ); 
    }

    render() {
        console.log(this.state);        
        return (
            <ScrollView>
                { this.renderAlbums() }
            </ScrollView>
        );
    }
}

export default AlbumList;
