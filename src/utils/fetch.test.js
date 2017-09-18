import Fecth from './fetch.js'
it('测试Fetch',()=>{
	window.environment='dev';
	Fecth.get('url',{a:[{user:'123',likes:[1,2,3],want:[{name:'hh',price:[1,2,3]}]},{user:'456',save:()=>{}}],b:'333'},{hello:'world'},{cache:'default'}).then((result)=>{
		expect(result.hello).toEqual('world');
	})
	Fecth.post('url',{userName:'syz'},{hello:'world'},{cache:'default'}).then((result)=>{
		expect(result.hello).toEqual('world');
	})
	Fecth.put('url',{userName:'syz'},{hello:'world'},{cache:'default'}).then((result)=>{
		expect(result.hello).toEqual('world');
	})
	Fecth.delete('url',{userName:'syz'},{hello:'world'},{cache:'default'}).then((result)=>{
		expect(result.hello).toEqual('world');
	})
})