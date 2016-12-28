import 'styles/index.scss';
import 'vendor/foundation';
import $ from 'jquery';
// import { Socket } from 'phoenix';

// function connect()
// {
//     const socket = new Socket('/socket');
//     socket.connect();
//     const channel = socket.channel('room:');
//     channel.on('new_user', () => {
//         $('#dots').append('.');
//     });

//     channel.join();
// }

$(() => {
    $(document).foundation();
    // connect();
});
