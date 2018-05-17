<template>
  <div class="main">
    <div class="character" v-if="modal==='character'">
      <button class="edit" v-on:click="modal='edit'">Edit Character</button>
      <button class="back" v-on:click="clearCharacter(); populateCharacters(); modal=''">Back</button>
      <div class="name">Name: <span>{{activeCharacter.name}}</span></div>
      <div class="classType">Class: <span>{{activeCharacter.classType}}</span></div>
      <div class="level">Level: <span>{{activeCharacter.characterLevel}}</span></div>
      <div class="hp">Health: <span>{{activeCharacter.health}}</span></div>
      <div class="stamina">Stamina: <span>{{activeCharacter.stamina}}</span></div>
      <div class="faction">Factions: <span>{{activeCharacter.factions}}</span></div>
      <div class="race">Race:<span>{{activeCharacter.race}}</span></div>
      <div class="job">Job:<span>{{activeCharacter.job}}</span></div>
      <div class="AC">Armor Class:<span>{{activeCharacter.totalAC}}</span></div>
      <div class="wallet">Wallet:<span>{{activeCharacter.wallet}}</span></div>
      <div class="bank">Bank:<span>{{activeCharacter.bank}}</span></div>
      <div class="ship">Ship:<span>{{activeCharacter.ship}}</span></div>
      <div class="vit">Vitality: <span>{{activeCharacter.vit}}</span></div>
      <div class="str">Strength: <span>{{activeCharacter.str}}</span></div>
      <div class="dex">Dexterity: <span>{{activeCharacter.dex}}</span></div>
      <div class="int">Intelligence: <span>{{activeCharacter.int}}</span></div>
      <div class="con">Constitution: <span>{{activeCharacter.con}}</span></div>
      <div class="end">Endurance: <span>{{activeCharacter.end}}</span></div>
      <div class="att">Attenuation: <span>{{activeCharacter.att}}</span></div>
      <div class="cha">Charisma: <span>{{activeCharacter.cha}}</span></div>
      <div class="lck">Luck: <span>{{activeCharacter.luck}}</span></div>
      <div class="will">Willpower: <span>{{activeCharacter.will}}</span></div>
      <h3 class="skillsHeader">Skills:</h3>
      <div class="skills">
        <div class="skill" v-for="skill in activeCharacter.skills" v-bind:key="skill.id">
          <h4 v-on:click="skill.toggled=!skill.toggled" v-if="!skill.toggled">{{skill.name}}</h4>
          <div class="skillDetails" v-if="skill.toggled">
            <h4 class="skillName">{{skill.name}}</h4>
            <p class="skillDescription"> {{skill.description}}</p>
            <button class="hide" v-on:click="skill.toggled=!skill.toggled">Hide Skill</button>
          </div>
        </div>
      </div>
      <h3 class="itemsHeader">Items:</h3>
      <div class="items">
        <div class="item" v-for="item in activeCharacter.inventory" v-bind:key="item.id">
          <h4 v-on:click="item.toggled=!item.toggled" v-if="!item.toggled">{{item.name}}</h4>
          <div class="itemDetails" v-if="item.toggled">
            <h4 class="itemName">{{item.name}}</h4>
            <p class="itemDescription">{{item.description}}</p>
            <button class="hide" v-on:click="item.toggled=!item.toggled">Hide Item</button>
          </div>
        </div>
      </div>
    </div>
    <div class="editModal" v-else-if="modal==='edit'">
      <div>Name<input class="name" v-model="activeCharacter.name" placeholder="name"/></div>
      <div>Class<input class="classType" v-model="activeCharacter.classType" placeholder="class type" /></div>
      <div>Level<input class="level" v-model="activeCharacter.characterLevel" placeholder="characer level" type="number" /></div>
      <div>Health<input class="hp" v-model="activeCharacter.health" placeholder="health" type="number" /></div>
      <div>Stamina<input class="stamina" v-model="activeCharacter.stamina" placeholder="stamina" type="number" /></div>
      <div>Faction<input class="faction" v-model="activeCharacter.factions" placeholder="factions" /></div>
      <div>Race<input class="race" v-model="activeCharacter.race" placeholder="race" /></div>
      <div>Occupation<input class="job" v-model="activeCharacter.job" placeholder="job" /></div>
      <div>Armor Class<input class="AC" v-model="activeCharacter.totalAC" placeholder="total armor class" type="number" /></div>
      <div>Wallet<input class="wallet" v-model="activeCharacter.wallet" placeholder="personal wallet" type="number" /></div>
      <div>Bank<input class="bank" v-model="activeCharacter.bank" placeholder="bank" type="number" /></div>
      <div>Ship<input class="ship" v-model="activeCharacter.ship" placeholder="ship charge" type="number" /></div>
      <div>Vitality<input class="vit" v-model="activeCharacter.vit" placeholder="vitality" type="number" /></div>
      <div>Strength<input class="str" v-model="activeCharacter.str" placeholder="strength" type="number" /></div>
      <div>Dexterity<input class="dex" v-model="activeCharacter.dex" placeholder="dexterity" type="number" /></div>
      <div>Intelligence<input class="int" v-model="activeCharacter.int" placeholder="intelligence" type="number" /></div>
      <div>Constitution<input class="con" v-model="activeCharacter.con" placeholder="constitution" type="number" /></div>
      <div>Endurance<input class="end" v-model="activeCharacter.end" placeholder="endurance" type="number" /></div>
      <div>Attenuation<input class="att" v-model="activeCharacter.att" placeholder="attenuation" type="number" /></div>
      <div>Charisma<input class="cha" v-model="activeCharacter.cha" placeholder="charisma" type="number" /></div>
      <div>Luck<input class="lck" v-model="activeCharacter.luck" placeholder="luck" type="number" /></div>
      <div>Willpower<input class="will" v-model="activeCharacter.will" placeholder="willpower" type="number" /></div>
      <div class="skillsEdit">
        <div class="skill" v-for="skill in activeCharacter.skills" v-bind:key="skill.id">
          <input class="skillName" v-model="skill.name" placeholder="skill name" />
          <input class="skillDescription" v-model="skill.description" placeholder="skill description" />
          <button class="skillDelete" v-on:click="deleteSkill(skill)">Delete Skill</button>
        </div>
      </div>
      <div class="itemsEdit">
        <div class="item" v-for="item in activeCharacter.inventory" v-bind:key="item.id">
          <input class="itemName" v-model="item.name" placeholder="item name" />
          <input class="itemDescription" v-model="item.description" placeholder="item description" />
          <button class="itemDelete" v-on:click="deleteItem(item)">Delete Item</button>
        </div>
      </div>
      <button class="newSkill" v-on:click="newSkill">Add New Blank Skill</button>
      <button class="newItem" v-on:click="newItem">Add New Blank Item</button>
      <button class="update" v-on:click="updateCharacter">Update Character</button>
      <button class="delete" v-on:click="modal='sure'">Delete Character</button>
      <button v-on:click="clearCharacter(); populateCharacters(); modal=''">Back</button>
    </div>
    <div v-else-if="modal==='sure'">
      <h3>Are you sure you want to delete {{activeCharacter.name}}? (this is permanent!!)</h3>
      <button v-on:click="deleteCharacter">Yes</button>
      <button v-on:click="modal='edit'">no</button>
    </div>
    <div class="create" v-else-if="modal==='creation'">
      <div>Name<input class="name" v-model="activeCharacter.name" placeholder="name"/></div>
      <div>Class<input class="classType" v-model="activeCharacter.classType" placeholder="class type" /></div>
      <div>Level<input class="level" v-model="activeCharacter.characterLevel" placeholder="characer level" type="number" /></div>
      <div>Health<input class="hp" v-model="activeCharacter.health" placeholder="health" type="number" /></div>
      <div>Stamina<input class="stamina" v-model="activeCharacter.stamina" placeholder="stamina" type="number" /></div>
      <div>Faction<input class="faction" v-model="activeCharacter.factions" placeholder="factions" /></div>
      <div>Race<input class="race" v-model="activeCharacter.race" placeholder="race" /></div>
      <div>Occupation<input class="job" v-model="activeCharacter.job" placeholder="job" /></div>
      <div>Armor Class<input class="AC" v-model="activeCharacter.totalAC" placeholder="total armor class" type="number" /></div>
      <div>Wallet<input class="wallet" v-model="activeCharacter.wallet" placeholder="personal wallet" type="number" /></div>
      <div>Bank<input class="bank" v-model="activeCharacter.bank" placeholder="bank" type="number" /></div>
      <div>Ship<input class="ship" v-model="activeCharacter.ship" placeholder="ship charge" type="number" /></div>
      <div>Vitality<input class="vit" v-model="activeCharacter.vit" placeholder="vitality" type="number" /></div>
      <div>Strength<input class="str" v-model="activeCharacter.str" placeholder="strength" type="number" /></div>
      <div>Dexterity<input class="dex" v-model="activeCharacter.dex" placeholder="dexterity" type="number" /></div>
      <div>Intelligence<input class="int" v-model="activeCharacter.int" placeholder="intelligence" type="number" /></div>
      <div>Constitution<input class="con" v-model="activeCharacter.con" placeholder="constitution" type="number" /></div>
      <div>Endurance<input class="end" v-model="activeCharacter.end" placeholder="endurance" type="number" /></div>
      <div>Attenuation<input class="att" v-model="activeCharacter.att" placeholder="attenuation" type="number" /></div>
      <div>Charisma<input class="cha" v-model="activeCharacter.cha" placeholder="charisma" type="number" /></div>
      <div>Luck<input class="lck" v-model="activeCharacter.luck" placeholder="luck" type="number" /></div>
      <div>Willpower<input class="will" v-model="activeCharacter.will" placeholder="willpower" type="number" /></div>
      <h3 class="skillsHeader">Skills:</h3>
      <div class="skillsEdit">
        <div class="skill" v-for="skill in activeCharacter.skills" v-bind:key="skill.id">
          <input class="skillName" v-model="skill.name" placeholder="skill name" />
          <input class="skillDescription" v-model="skill.description" placeholder="skill description" />
          <button class="skillDelete" v-on:click="deleteSkill(skill)">Delete Skill</button>
        </div>
      </div>
      <h3 class="itemsHeader">Items:</h3>
      <div class="itemsEdit">
        <div class="item" v-for="item in activeCharacter.inventory" v-bind:key="item.id">
          <input class="itemName" v-model="item.name" placeholder="item name" />
          <input class="itemDescription" v-model="item.description" placeholder="item description" />
          <button class="itemDelete" v-on:click="deleteItem(item)">Delete Item</button>
        </div>
      </div>
      <button class="newSkill" v-on:click="newSkill">Add New Blank Skill</button>
      <button class="newItem" v-on:click="newItem">Add New Blank Item</button>
      <button class="newChar" v-on:click="makeCharacter">Make New Character</button>
      <button class="back" v-on:click="clearCharacter(); populateCharacters(); modal=''">Back</button>
    </div>
    <div class="listView" v-else>
      <h1>Characters</h1>
      <h2 v-for="character in characters" v-on:click="viewCharacter(character)" v-bind:key="character.id">Lv.{{character.characterLevel}} - {{character.name}}<br/>{{character.race}} - {{character.classType}}</h2>
      <button class="new" v-on:click="modal='creation'">Make a New Character</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Characters',
  props: ['user'],
  data () {
    return {
      modal: '',
      characters: [],
      activeCharacter: {
        id: '',
        name: '',
        classType: '',
        characterLevel: '',
        health: '',
        stamina: '',
        factions: '',
        race: '',
        job: '',
        totalAC: '',
        wallet: '',
        bank: '',
        ship: '',
        vit: '',
        str: '',
        dex: '',
        int: '',
        con: '',
        end: '',
        att: '',
        cha: '',
        luck: '',
        will: '',
        skills: [],
        inventory: []
      }
    }
  },
  created () {
    let vue = this
    vue.populateCharacters()
  },
  methods: {
    populateCharacters () {
      let vue = this
      vue.characters = []
      axios.get('https://api.tuskgaming.com/characters/all', {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.characters = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    viewCharacter (character) {
      let vue = this
      vue.activeCharacter.id = character._id
      vue.activeCharacter.name = character.name
      vue.activeCharacter.classType = character.classType
      vue.activeCharacter.characterLevel = character.characterLevel
      vue.activeCharacter.health = character.health
      vue.activeCharacter.stamina = character.stamina
      vue.activeCharacter.factions = character.factions
      vue.activeCharacter.race = character.race
      vue.activeCharacter.job = character.job
      vue.activeCharacter.totalAC = character.totalAC
      vue.activeCharacter.wallet = character.wallet
      vue.activeCharacter.bank = character.bank
      vue.activeCharacter.ship = character.ship
      vue.activeCharacter.vit = character.vit
      vue.activeCharacter.str = character.str
      vue.activeCharacter.dex = character.dex
      vue.activeCharacter.int = character.int
      vue.activeCharacter.con = character.con
      vue.activeCharacter.end = character.end
      vue.activeCharacter.att = character.att
      vue.activeCharacter.cha = character.cha
      vue.activeCharacter.luck = character.luck
      vue.activeCharacter.will = character.will
      vue.activeCharacter.skills = character.skills
      vue.activeCharacter.inventory = character.inventory
      vue.modal = 'character'
    },
    makeCharacter () {
      let vue = this
      axios.post('https://api.tuskgaming.com/characters', {
        name: vue.activeCharacter.name,
        classType: vue.activeCharacter.classType,
        characterLevel: vue.activeCharacter.characterLevel,
        health: vue.activeCharacter.health,
        stamina: vue.activeCharacter.stamina,
        factions: vue.activeCharacter.factions,
        race: vue.activeCharacter.race,
        job: vue.activeCharacter.job,
        totalAC: vue.activeCharacter.totalAC,
        wallet: vue.activeCharacter.wallet,
        bank: vue.activeCharacter.bank,
        ship: vue.activeCharacter.ship,
        vit: vue.activeCharacter.vit,
        str: vue.activeCharacter.str,
        dex: vue.activeCharacter.dex,
        int: vue.activeCharacter.int,
        con: vue.activeCharacter.con,
        end: vue.activeCharacter.end,
        att: vue.activeCharacter.att,
        cha: vue.activeCharacter.cha,
        luck: vue.activeCharacter.luck,
        will: vue.activeCharacter.will,
        skills: vue.activeCharacter.skills,
        inventory: vue.activeCharacter.inventory
      })
        .then(result => {
          vue.modal = 'character'
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateCharacter () {
      let vue = this
      axios.put('https://api.tuskgaming.com/characters/' + vue.activeCharacter.id, {
        name: vue.activeCharacter.name,
        classType: vue.activeCharacter.classType,
        characterLevel: vue.activeCharacter.characterLevel,
        health: vue.activeCharacter.health,
        stamina: vue.activeCharacter.stamina,
        factions: vue.activeCharacter.factions,
        race: vue.activeCharacter.race,
        job: vue.activeCharacter.job,
        totalAC: vue.activeCharacter.totalAC,
        wallet: vue.activeCharacter.wallet,
        bank: vue.activeCharacter.bank,
        ship: vue.activeCharacter.ship,
        vit: vue.activeCharacter.vit,
        str: vue.activeCharacter.str,
        dex: vue.activeCharacter.dex,
        int: vue.activeCharacter.int,
        con: vue.activeCharacter.con,
        end: vue.activeCharacter.end,
        att: vue.activeCharacter.att,
        cha: vue.activeCharacter.cha,
        luck: vue.activeCharacter.luck,
        will: vue.activeCharacter.will,
        skills: vue.activeCharacter.skills,
        inventory: vue.activeCharacter.inventory
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(result => {
          vue.modal = 'character'
        })
        .catch(err => {
          console.log(err)
        })
    },
    clearCharacter () {
      let vue = this
      vue.activeCharacter.name = ''
      vue.activeCharacter.classType = ''
      vue.activeCharacter.characterLevel = ''
      vue.activeCharacter.health = ''
      vue.activeCharacter.stamina = ''
      vue.activeCharacter.factions = ''
      vue.activeCharacter.race = ''
      vue.activeCharacter.job = ''
      vue.activeCharacter.totalAC = ''
      vue.activeCharacter.wallet = ''
      vue.activeCharacter.bank = ''
      vue.activeCharacter.ship = ''
      vue.activeCharacter.vit = ''
      vue.activeCharacter.str = ''
      vue.activeCharacter.dex = ''
      vue.activeCharacter.int = ''
      vue.activeCharacter.con = ''
      vue.activeCharacter.end = ''
      vue.activeCharacter.att = ''
      vue.activeCharacter.cha = ''
      vue.activeCharacter.luck = ''
      vue.activeCharacter.will = ''
      vue.activeCharacter.skills = []
      vue.activeCharacter.inventory = []
    },
    deleteCharacter () {
      let vue = this
      axios.delete('https://api.tuskgaming.com/characters/' + vue.activeCharacter.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(result => {
          vue.clearCharacter()
          vue.populateCharacters()
          vue.modal = ''
        })
        .catch(err => {
          vue.modal = 'edit'
          console.log(err)
        })
    },
    newSkill () {
      let vue = this
      vue.activeCharacter.skills.push({name: '', description: '', toggled: false})
    },
    newItem () {
      let vue = this
      vue.activeCharacter.inventory.push({name: '', description: '', weight: 0, toggled: false})
    },
    deleteSkill (skill) {
      let vue = this
      let position = vue.activeCharacter.skills.indexOf(skill)
      vue.activeCharacter.skills.splice(position, 1)
    },
    deleteItem (item) {
      let vue = this
      let position = vue.activeCharacter.inventory.indexOf(item)
      vue.activeCharacter.inventory.splice(position, 1)
    }
  }
}
</script>

<style scoped lang="less">
.main {
  background-image: url('../assets/noise2.jpg');
  height: 200%;
  width: 100%;
  background-repeat: repeat;
  margin-top: 80px;
  position: absolute;
}
.listView {
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 100px);
}
.create {
  margin-left: 5%;
  margin-right: 5%;
  font-size: 1em;
  margin-top: 5em;
  display: grid;
  grid-gap: 5px;
  grid-template-rows: repeat(30, 40px);
}
.editModal {
  width: 90%;
  height: 90%;
  margin-left: 5%;
  margin-right: 5%;
  font-size: 1em;
  margin-top: 5em;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: repeat(30, 1fr);
}

.character {
  margin-left: 5%;
  margin-right: 5%;
  font-size: 1em;
  margin-top: 5em;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(30, 40px);
}
/*Character Page*/
.name {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row: 2;
  border: 1px solid black;
}
.classType {
  grid-column-start: 6;
  grid-column-end: 11;
  grid-row: 2;
  border: 1px solid black;
}
.level {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 3;
  border: 1px solid black;
}
.race {
  grid-column-start: 3;
  grid-column-end: 6;
  grid-row: 3;
  border: 1px solid black;
}
.faction {
  grid-column-start: 1;
  grid-column-end: 11;
  grid-row: 4;
  border: 1px solid black;
}
.hp {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row: 5;
  border: 1px solid black;
}
.stamina {
  grid-column-start: 4;
  grid-column-end: 7;
  grid-row: 5;
  border: 1px solid black;
}
.AC {
  grid-column-start: 7;
  grid-column-end: 11;
  grid-row: 5;
  border: 1px solid black;
}
.job {
  grid-column-start: 6;
  grid-column-end: 11;
  grid-row: 3;
  border: 1px solid black;
}
.wallet {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row: 6;
  border: 1px solid black;
}
.bank {
  grid-column-start: 4;
  grid-column-end: 7;
  grid-row: 6;
  border: 1px solid black;
}
.ship {
  grid-column-start: 7;
  grid-column-end: 11;
  grid-row: 6;
  border: 1px solid black;
}
.vit {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 8;
  border: 1px solid black;
}
.str {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 9;
  border: 1px solid black;
}
.dex {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 10;
  border: 1px solid black;
}
.int {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 11;
  border: 1px solid black;
}
.con {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 12;
  border: 1px solid black;
}
.end {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 13;
  border: 1px solid black;
}
.cha {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 14;
  border: 1px solid black;
}
.att {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 17;
  border: 1px solid black;
}
.lck {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 15;
  border: 1px solid black;
}
.will {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 16;
  border: 1px solid black;
}
h1 {
  font-size: 3em;
  text-align: center;
  grid-column-start: 1;
  grid-column-end: 11;
  margin-bottom: 60px;
  font-weight: lighter;
}
.skills {
  grid-row-start: 20;
  grid-row-end: 25;
  grid-column-start: 1;
  grid-column-end: 11;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(20, 1em);
  border: 1px solid black;
  text-decoration: underline;
  padding-left: 5%;
  line-height: 30px;
}
.items {
  text-decoration: underline;
  padding-left: 5%;
  grid-row-start: 28;
  grid-row-end: 34;
  grid-column-start: 1;
  grid-column-end: 11;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(20, 1em);
  border: 1px solid black;
}
.skillsHeader {
  text-align: center;
  grid-row-start: 18;
  grid-column-start: 1;
  grid-column-end: 3;
}
.itemsHeader {
  text-align: center;
  grid-row-start: 26;
  grid-column-start: 1;
  grid-column-end: 3;
}
.newChar {
  position: absolute;
  bottom: 40px;
  height: 1.5em;
  line-height: 1.4em;
  width: 100%;
}
.edit {
  color: #fff;
  box-shadow: 0px 3px 4px black;
  background-image: url('../assets/noise.png');
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 5;
  height: 2em;
  line-height: 1.4em;
  width: 100%;
}
.back {
  box-shadow: 0px 3px 4px black;
  background-image: url('../assets/noise.png');
  height: 2em;
  line-height: 1.4em;
  width: 100%;
  color: #fff;
}
.new {
  height: 60px;
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-position: left;
  background-image: url('../assets/noise.png');
  border: none;
  box-shadow: 0px 3px 4px black;
  color: white;
  font-size: 1.7em;
  font-weight: lighter;
}
h2 {
  color: white;
  grid-column-start: 2;
  grid-column-end: 10;
  background-image: url('../assets/noise.png');
  line-height: 28px;
  padding-left: 5%;
  font-size: 1.3em;
  height: 60px;
}
button {
  box-shadow: 0px 3px 4px black;
  background-image: url('../assets/noise.png');
  height: 2em;
  line-height: 1.4em;
  color: #fff;
}
</style>
