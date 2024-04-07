class Modal {
    constructor(id) {
      this.id = id;
      this.window = document.getElementById(id);
      this.modal = this.window.querySelector('.modal');
      this.closeBtn = this.window.querySelector('.modal-close');
      this.form = this.window.querySelector('FORM');
    };
  
    open() {
      this.window.classList.add('opened');
      this.window.addEventListener('click', (e) => this._handleClick(e));
      this.closeBtn?.addEventListener('click', () => this.close());
      this.form?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.close();
      });
    };
  
    close() {
      this.window.removeEventListener('click', (e) => this._handleClick(e));
      this.closeBtn?.removeEventListener('click', () => this.close());
      this.window.classList.remove('opened');
    };
  
    _handleClick(e) {
      if (e.target === this.window || e.target.matches('.modal-link')) {
        this.close();
      }
    }
}

(function() {
    const expandingTabs = document.querySelectorAll('.expanding-tabs-list');

    expandingTabs.forEach(list => {
        list.addEventListener('click', function(e) {
            const t = e.target;
            const closestTab = t.closest('.expanding-tab');
            if (closestTab) {
                if (closestTab.classList.contains('opened')) {
                    closestTab.classList.remove('opened');
                } else {
                    closestTab.classList.add('opened');
                }
            }
        }); 
    });

    const modalButtons = document.querySelectorAll('[data-modal-id]');

    modalButtons.forEach(btn => {
        const id = btn.dataset.modalId;
        const modal = new Modal(id);
        btn.addEventListener('click', () => modal.open());
    });

    const openFirstModal = () => {
        const modal = new Modal('price-modal');
        modal.open();
    };

    window.addEventListener('DOMContentLoaded', () => {
        
    });

    document.addEventListener('DOMContentLoaded', function () {
        // Первый модал
        // setTimeout(openFirstModal, 5000);

        // Воспроизведение аудио
        let _settings = {
            default: {text: 'Послушать'},
            pause: {text: 'Пауза', class: 'pause'},
            play: {text: 'Остановить', class: 'playing'},
            end: {text: 'Прослушано'}
        };
        let _current = {i: null, audio: null};
        let _classes = [];
        for (let i in _settings) {
            if (_settings[i].class !== undefined)
                _classes.push(_settings[i].class);
        }
        document.querySelectorAll('[data-audio]').forEach(($e) => {
            const textSpan = $e.querySelector('.audio-example-text');
            textSpan.innerText = _settings.default.text;
            $e.addEventListener('click', function () {
                let src = this.dataset.audio;
                // Глушим старый звук
                if (this !== _current.i) {
                    if (_current.audio)
                        _current.audio.pause();
                    // Дефолт настройки для предыдушего звука.
                    if (_current.i) {
                        textSpan.innerText = _settings.default.text;
                        _current.i.setClass();
                    }
                    // Подгружаем, если первый раз.
                    _current.audio = new Audio(src);
                }
                _current.i = this;
                // Удаляем классы из _settings и устанавливаем новый, если есть.
                _current.i.setClass = function (_class = null) {
                    this.classList.forEach(current_class => {
                        if (_classes.indexOf(current_class) !== -1)
                            this.classList.remove(current_class);
                    })
                    if (_class !== null)
                        this.classList.add(_class);
                };
                // Если снимаем с паузы/запускаем в первый раз.
                if (_current.audio.paused) {
                    _current.audio.play();
                    _current.i.setClass(_settings.play.class);
                    textSpan.innerText = _settings.play.text;
                    // Если ставим на паузу.
                } else {
                    _current.audio.pause();
                    textSpan.innerText = _settings.pause.text;
                    _current.i.setClass(_settings.pause.class);
                }
                // После окончания звука.
                _current.audio.onended = () => {
                    textSpan.innerText = _settings.end.text;
                    _current.i.setClass();
                }
            });
        });
    });

}());