# 課題　 -ネットミームガチャ-

## DEMO
https://w-baby-y.github.io/kadai03/

## ①課題内容
- ネットミームをカードに見立ててガチャができるアプリ
- localStorageを利用して、現在まで行ったガチャの当選確率やカードのコレクションを復帰できるようにした。またAPIKeyをハードコーディングするのではなくpromptで入力し、localStorageに保存するようにした

## ②工夫した点・こだわった点
- localStrageはkeyと値しか保存できないため、JSONを使ってオブジェクトを保存するようにした。
- CSSでカードっぽい見た目にすることをこだわった
- ChatGPTのAPIを呼び出して、現在までのガチャの回数とレアカードの出具合を使って、これ以上ガチャをしたほうがいいか相談するボタンをつくった。
- ChatGPTは回答に時間がかかり、普通に実装すると意図しない動作になるため、非同期処理としてコーディングした
- 今までガチャで使ってきたお金の無情さを理解するためにこのアプリを作ったが、実際にお金を払う仕組みがあると面白いと考えて、IoTを手軽にJavaScriptで実装できるobnizを利用して貯金箱とスイッチを組み合わせてお金を投入するとガチャが回せる仕組みを仮組みした。仕組みの写真は以下の通り
- ![iot](https://github.com/w-baby-y/kadai03/assets/132176613/83831660-625d-45ea-b006-729c2c1512d7)

## ③難しかった点・次回トライしたいこと(又は機能)
- 非同期処理のためのPromise、async、awaitがどのような仕組みで動くのかイマイチ理解できていない
- ~~カードを引く際の演出をこだわりたかったが、諦めた~~アニメーションを追加したが、クラスの削除→追加を遅延させて実行する必要があることを理解するのに時間がかかった
- APIKeyはサーバーサイドに保存するそうなので、次回はそのようにしたい

## ④質問・疑問・感想、シェアしたいこと等なんでも
- [質問]非同期処理の仕組みをわかり易く説明したサイトを教えてほしい
- [感想]最初に比べてエラーが発生することが減ってきた。ただ、$('#btn')の#を忘れて動かないことが頻繁にあったので気をつけたい
- [参考記事]限定ジャンケンルール　https://www.info.kindai.ac.jp/~takasi-i/thesis/2016_12-1-037-0083_T_Satoh_thesis.pdf
- [参考記事]ミーム画像 https://filmora.wondershare.jp/video-editing-tips/famous-internet-meme.html
- [参考記事]ミーム画像 https://note.com/studyfan/n/na0caf80db096
- [参考記事]ミーム画像 https://filmora.wondershare.jp/meme-maker/
- [参考記事]ミーム画像 https://gifmagazine.net/matome/2389
- [参考記事]ChatGPT実装 https://1-notes.com/javascript-openai-api-sample-code/
- [参考記事]obniz https://docs.obniz.com/ja/guides/obniz-starter-kit/iot-by-html-and-javascript/detect-button-on-browser
