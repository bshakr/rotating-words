(function() {
  window.RotatingWords = (function() {
    function RotatingWords(containerId) {
      this.containerId = containerId;
      this.words = $(containerId).data('words').split(' ');
      this.currentWord = ""
      this.nextWord = this.words.shift();
      this.words.push(this.currentWord)
      this.backspaceInterval = null;
      this.typeNextCharInterval = null
    }

    RotatingWords.prototype.changeWord = function() {
      var typeNextWordTimeoutTime = (this.currentWord.length * 100) + 300;
      console.log(typeNextWordTimeoutTime)
      this.backspaceInterval = setInterval('rotatingWords.backspace()', 100);

      setTimeout(function(){
        console.log('typign next word')
        rotatingWords.typeNextCharInterval = setInterval('rotatingWords.typeNextChar()', 350);
      }, typeNextWordTimeoutTime);

      //this.type(this.nextWord)
    };

    RotatingWords.prototype.backspace = function() {
      substring = this.currentWord.substr(0, this.currentWord.length - 1);
      this.currentWord = substring;
      $(this.containerId).html(substring);
      if(substring.length == 0) {
        clearInterval(this.backspaceInterval);
      }
    };

    RotatingWords.prototype.typeNextChar = function() {
      console.log('typing next char')
      nextChar = this.nextWord.substr(0, 1);
      this.nextWord = this.nextWord.substr(1, this.nextWord.length);
      currentChars = $(this.containerId).html();
      this.currentWord = currentChars + nextChar;
      $(this.containerId).html(this.currentWord);
      if(this.nextWord.length == 0) {
        clearInterval(rotatingWords.typeNextCharInterval);
        rotatingWords.words.push(rotatingWords.currentWord)
        rotatingWords.nextWord = rotatingWords.words.shift();
        setTimeout(function() {
          rotatingWords.changeWord();
        }, 900)
      }
    };

    return RotatingWords;
  })();

}).call(this);
