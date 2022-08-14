document.getElementById("main").style.display = "none";
document.getElementById("main1").style.display = "none";
class Page{
    constructor(content,tick=0){
        this.content = content
        this.tick = tick
    }

    tick_clock(val=1){
        this.tick += val
    }

    change(content, tick=0){
        this.content = content
        this.tick = tick
    }

    getString(){
        return this.content
    }
}

class FIFO{
    constructor(pagesize, filler='_') {

        this.page_fault = 0

        this.pageFrame = []

        this.currentInput = 0

        for(let i = 0; pagesize > i; i++){
            this.pageFrame.push(new Page(filler))
            this.pageFrame[i].tick = pagesize - i
        }

        this.inputList = []

        this.history = []

        this._log_history('_', false)
    }

    _set_frames(){
        //container class only
    }

    getinput_string(input){
        this.inputList = this.inputList.concat(input.split(" "))

        this._set_frames()
    }

    getinput_list(input){
        this.inputList = this.inputList.concat(input)

        this._set_frames()
    }

    _get_last(){
        let retIndex = -1
        let mostLeast = -1
        for (let p=0; p<this.pageFrame.length; p++){
            if (this.pageFrame[p].tick > mostLeast){
                mostLeast = this.pageFrame[p].tick
                retIndex = p
            }
        }

        return retIndex
    }

    _check_exist(item){
        let retIndex = -1

        for (let p=0; p<this.pageFrame.length; p++){
            if (this.pageFrame[p].content === item){
                retIndex = p
                break
            }
        }

        return retIndex
    }

    _tick_all(){
        for (let p=0; p<this.pageFrame.length; p++){
            this.pageFrame[p].tick_clock()
        }
    }

    _get_frame_string(){
        let fr_str = []
        for (let p=0; p<this.pageFrame.length; p++){
            fr_str.push(this.pageFrame[p].getString())
        }

        return fr_str
    }

    _get_frame_health(){
        let fr_str = []
        for (let p=0; p<this.pageFrame.length; p++){
            fr_str.push(this.pageFrame[p].tick)
        }

        return fr_str
    }

    _log_history(input, change){
        if (change){
            this.page_fault += 1
        }
        let data = {
            step: this.currentInput, 
            input: input, 
            page: this._get_frame_string(),
            page_health: this._get_frame_health(),
            changed: change,
            page_fault: this.page_fault
        }

        data.page_health_worst = Math.max(...data["page_health"])

        this.history.push(
            data
        )

        return data
    }

    page_step(){

        if (this.currentInput >= this.inputList.length){
            return false
        }

        let currentData = this.inputList[this.currentInput]

        let exist = this._check_exist(currentData)

        let index_to_change = 0

        let change = false

        if (exist == -1){ // item not exist
            index_to_change = this._get_last()
            this.pageFrame[index_to_change].change(currentData)
            change = true
        }

        this.currentInput += 1
        this._tick_all()
        
        let log = this._log_history(currentData, change)

        return log
    }

    page_run(){
        for(let i=this.currentInput; i < this.inputList.length; i++){
            this.page_step()
        }
    }
}

class LRU extends FIFO{
    constructor(pagesize, filler='_') {
        super(pagesize, filler)
        
    }


    page_step(){

        if (this.currentInput >= this.inputList.length){
            return false
        }

        let currentData = this.inputList[this.currentInput]

        let exist = this._check_exist(currentData)

        let index_to_change = 0

        let change = false

        if (exist == -1){ // item not exist
            index_to_change = this._get_last()
            this.pageFrame[index_to_change].change(currentData)
            change = true
        }
        else{
            this.pageFrame[exist].change(currentData)
        }

        this.currentInput += 1
        this._tick_all()
        
        let log = this._log_history(currentData, change)

        return log
    }

}

class Optimal extends FIFO{
    constructor(pagesize, filler='_') {

        super(pagesize, filler)

        this.max = 1000

        this.page_fault = 0

        this.pagesize = pagesize
        this.filler = filler

        this.pageFrame = []

        this.currentInput = 0

        for(let i = 0; pagesize > i; i++){
            this.pageFrame.push(new Page(filler))
            this.pageFrame[i].tick = pagesize - i
        }

        this.inputList = []

        this.history = []

        this._log_history('_', false)
        
    }

    _tick_all(){
        for (let p=0; p<this.pageFrame.length; p++){
            this.pageFrame[p].tick_clock(-1)
        }
    }

    _get_last(){
        let retIndex = -1
        let mostLeast = -10000
        for (let p=0; p<this.pageFrame.length; p++){
            if (this.pageFrame[p].tick > mostLeast){
                mostLeast = this.pageFrame[p].tick
                retIndex = p
            }
        }

        return retIndex
    }

    _set_frames(){
        this.max = this.inputList.length

        this.pageFrame = []
        
        for(let i = 0; this.pagesize > i; i++){
            this.pageFrame.push(new Page(this.filler))
            this.pageFrame[i].tick = (this.max - i) + this.max*2
        }

    }

    _get_next_occurence(target){
        let index = this.inputList.indexOf(target,this.currentInput+1)

        if (index !== -1){
            return index - this.currentInput
        }

        index = this.inputList.indexOf(target)

        if (index !== -1){
            return (this.inputList.length - this.currentInput) + index
        }
        else{
            return this.inputList.length
        }

    }


    page_step(){

        if (this.currentInput >= this.inputList.length){
            return false
        }

        let currentData = this.inputList[this.currentInput]
        let nextOccurence = this._get_next_occurence(currentData)

        let exist = this._check_exist(currentData)

        let index_to_change = 0

        let change = false


        if (exist == -1){ // item not exist
            index_to_change = this._get_last()
            this.pageFrame[index_to_change].change(currentData, nextOccurence)
            change = true
        }
        else{
            this.pageFrame[exist].change(currentData, nextOccurence)
        }

        this.currentInput += 1
        this._tick_all()
        
        let log = this._log_history(currentData, change)

        return log
    }

}

/*
p_lru = new LRU(3, '')

//input = '7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1'.split(" ")
//input = '1 2 3 4 1 2 5 1 2 3 4 5'.split(" ")    
input = '5 7 6 5 7 3'.split(" ")
p_lru.getinput_list(input)
p_lru.page_run()
console.log(p_lru.history)
*/

/*
for(let i = 0; i < input.length; i++){
    console.log(p_lru.page_step())
}
*/

class View{
    constructor(){
        this.DOM = {
            Input : {
                input : document.querySelector("#input-input"),
                frame : document.querySelector("#input-frames"),
                algorithm : document.querySelector("#input-algorithm"),
                start : document.querySelector("#input-start"),
                clear : document.querySelector("#input-clear"),
                error : document.querySelector("#Error"),
            },

            Results : {
                faults: document.querySelector("#results-faults"),
                hits: document.querySelector("#results-hits"),
                references : document.querySelector("#results-references"),
                faultrate : document.querySelector("#results-faultrate"),
                hitrate : document.querySelector("#results-hitrate"),
            },

            Output : {
                input : document.querySelector("#output-input"),
                history : document.querySelector("#output-history")
            }
            
        }

        this.results_template = {
            faults : 0,
            hits : 0,
            references : 0,
            faultrate : 0,
            hitrate : 0,
        }

        this.input_template = {
            input : '',
            frame : '3',
            algorithm : 'LRU',
        }
        
    }

    update_results(results_template){
        for(let entry in results_template){
            this.DOM.Results[entry].textContent = results_template[entry]
        }
    }

    reset_results(){
        this.DOM.Output.input.innerHTML = ""
        this.DOM.Output.history.innerHTML = ""
    }

    get_input(){
        let template = {...this.input_template}

        for(let entry in template)
            template[entry] = this.DOM.Input[entry].value

        return template
    }

    reset_input(){
        for(let entry in this.input_template){
            if (entry == 'algorithm') continue
            this.DOM.Input[entry].value = this.input_template[entry]
        }
    }

    _input_entry(cont, index){
        let style=`
        animation-delay: ${index*0.00}s;
        `

        let dom_cont = `<p class="animate__animated  animate__fadeInDown animate__faster" style="${style}">${cont}</p>`
        this.DOM.Output.input.innerHTML += dom_cont
    }

    add_input_list(input_array){
        // assuming that the input_array is already cleaned

        this.DOM.Output.input.innerHTML = ''


        for(let i in input_array){
            this._input_entry(input_array[i], i)
        }
    }

    _history_entry(curData){

        let frames = curData.page
        let frames_health = curData.page_health
        let frames_health_worse = curData.page_health_worst
        let index = curData.step
        let input = curData.input
        let changed = curData.changed

        let style=`
        animation-delay: ${index*0.15}s;
        `

        let html = `
        <div class="history-entry animate__animated  animate__flipInY animate__faster" style="${style}">
            <index>

            <div class="data">
                <p><input></p>
                <p style="color: <changed_color>"><changed></p>
            </div>

            <frames>

        </div>
        `

        html = html.replace('<index>', `<h5>${index}</h5>`)
        html = html.replace('<input>', input)
        html = html.replace('<changed>', changed ? 'Fault' : 'Hit')
        html = html.replace('<changed_color>', changed ? 'red' : 'black')

        let frames_html = ''

        let filters = ['', ' '] 

        for(let i in filters){
            frames = frames.filter(word => word !== filters[i])
        }
        
        let fr_style = ""
        let percentage = 0
        for(let i in frames){ 
            percentage = (frames_health_worse-frames_health[i]+1)/frames_health_worse
            
            fr_style = `
                background-color: rgb(${0}, ${0}, ${0}, ${percentage});
                color: rgb(${255*(percentage>.5)},${255*(percentage>.5)},${255*(percentage>.5)});
            `

            frames_html += `<p style="${fr_style}">${frames[i]}</p>`
        }

        html = html.replace('<frames>', frames_html)


        this.DOM.Output.history.innerHTML += html
    }

    process_results(result_data){

        this.DOM.Output.history.innerHTML = ''
        let curData = null

        for(let i in result_data){
            curData = result_data[i]
            this._history_entry(curData)
        }
        
        let data = result_data.pop()

        let results = {
            faults : data.page_fault,
            hits : data.step - data.page_fault,
            references : data.step,
            faultrate : `${((data.page_fault)/data.step*100).toFixed(2)}%`,
            hitrate : `${((data.step-data.page_fault)/data.step*100).toFixed(2)}%`,
        }
        

        this.update_results(results)
    }

    display_error(err){
        if (err === false){
            this.DOM.Input.error.classList.add("hide-display")
        }
        else{
            this.DOM.Input.error.classList.remove("hide-display")
            this.DOM.Input.error.textContent = err
        }   
    }
}

class Controller{
    
    constructor(view=new View()) {
        this.View = view

        this.DOM = this.View.DOM
        
        this.results = {...this.View.results_template}
        this.input = {...this.View.input_template}
        
        this.dom_declarations()

        this.algorithms = {
            lru : LRU,
            fifo : FIFO,
            optimal: Optimal,
        }

        this.cont_data = {
            error_pass : true,
        }
    }


    dom_declarations(){
        this.DOM.Input.start.addEventListener("click", () => this.start())

        this.DOM.Input.input.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
              this.start()
            }
            else if (event.keyCode === 106) {
                this.random_input()
            }
        });
        
        this.DOM.Input.frame.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                this.start()
            }
        });

        this.DOM.Input.clear.addEventListener("click", () => this.clear())
    }

    _filter_input(inp){

        let filters =  ['', ' ']

        for(let i in filters){
            
            inp = inp.filter(text => text !== filters[i])
        }

        return inp
    }

    start(){
        let input = this.View.get_input()

        let inputentry = input.input.split(' ')
        inputentry = this._filter_input(inputentry)

        if ((inputentry.length > 15 || inputentry.length < 4) && this.cont_data.error_pass){
            this.View.display_error(`Escriba al menos 4 referencias.`)
            this.cont_data.error_pass = false
        }
        else{
            this.View.display_error(false)
            this.View.add_input_list(inputentry)

            let process = new this.algorithms[input.algorithm](input.frame, '')
            process.getinput_list(inputentry)
            process.page_run()
            console.log(process.history)
            this.View.process_results(process.history)
            this.cont_data.error_pass = true
        }

        
    }

    random_input(){
        let min_count = 10
        let max_count = 30

        let html = ''

        for(
            let i=0; 
            i < Math.floor(Math.random() * (max_count-min_count)) + min_count;
            i++){
            html += `${Math.floor(Math.random() * 10)} `
        }

        this.DOM.Input.input.value = html
        
    }

    clear(){
        this.View.reset_input()
        this.View.reset_results()
    }
}

$('#input-start').click(function () {
    col1 = document.getElementById('input-input').value;
    col2 = col1.toString();
    referencias = col2.split(' ');
    if(referencias.length >= 4){
        document.getElementById("main").style.display = "block";
    }
})

$('#input-clear').click(function () {
    document.getElementById("main").style.display = "none";
})

let controller = new Controller()