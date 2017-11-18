function getComponent() {
  return import ('lodash').then(_ => {
    // demo = await
    // import ('./async-demo')
    // console.log("***", demo);
    console.log(
      _.join(['Another', 'module', 'loaded!'], ' ')
    );
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
  document.body.appendChild(component);
})