# xkcd Password Generator

The button below will generate a random phrase consisting of four common words. According to [this](http://xkcd.com/936/) xkcd strip, such phrases are hard to guess (even by brute force) but easy to remember, making them interesting password choices.

This generator uses true random numbers from [random.org](http://random.org/). The word list it uses is a merge of the Electronic Freedom Foundation (EFF) and Beale diceware word lists (minus the special character and number filler words in the Beale list). I also added a few fun nerd culture words at the end. In total there are a little over 14,000 words.

I estimate that generated passwords have an entropy of 55. (log<sub>2</sub> 14000 x 4)

![xkcd](https://imgs.xkcd.com/comics/password_strength.png)
