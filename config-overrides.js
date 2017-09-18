const fs = require('fs');

if(!process.env.NODE_ENV){
	process.env.NODE_ENV="test"
}

const presets = require('babel-preset-react-app') ;
module.exports = function override(config, env) {
	//为bebel增加注解的转换器
	presets.plugins.unshift(require.resolve('babel-plugin-transform-decorators-legacy'))

	presets.presets.push(require.resolve('babel-preset-stage-0'));
  	

	//重新覆盖webpack的bebel配置
	
	let babelRule=config.module.rules.find((ele)=>{
		return ele.oneOf;
	}).oneOf.find((ele)=>{
		return ele.loader.indexOf('babel-loader') !== -1;
	})
	babelRule.options.presets=[presets];
	console.log('config')
	fs.writeFileSync('webpack.config',JSON.stringify(config))

 	return config;
};