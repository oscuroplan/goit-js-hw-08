// _____импортируем библиотеки:

// - плеер
import Player from '@vimeo/player';
// - задержка
import throttle from 'lodash.throttle';

// находим плеер
const iframe = document.querySelector('#vimeo-player');

// создаем копию
const player = new Player(iframe);

// записываем в локал текущее значение времени
const onPlay = time => localStorage.setItem('videoplayer-current-time', time.seconds);

// получает из локального хранилища текущую позицию
const currentTimeOfVideo = localStorage.getItem('videoplayer-current-time');

// если есть сохраненная текущая позиция и она отлична от 0, устанавливаем на плеере сохраненную текущую позицию
currentTimeOfVideo ? player.setCurrentTime(currentTimeOfVideo) : null;

// при запуске просмотра вызываем обработку и передаем текущие секунды в onPlay с интервалом в 1 секунду
player.on('timeupdate', throttle(onPlay, 1000));
