<template>
  <div class="main">
    <div class="character" v-if="modal==='character'">
      <div class="name">Name: <span>{{activeCharacter.name}}</span></div>
      <div class="hp">Health: <span>{{activeCharacter.health}}</span></div>
      <div class="exhaustion">Exhaustion: <span>{{activeCharacter.exhaustion}}</span></div>
      <div class="race">Race:<span>{{activeCharacter.race}}</span></div>
      <div class="yid">Yid:<span>{{activeCharacter.yid}}</span></div>
      <div class="str">Strength: <span>{{activeCharacter.str}}</span></div>
      <div class="dex">Dexterity: <span>{{activeCharacter.dex}}</span></div>
      <div class="int">Intelligence: <span>{{activeCharacter.int}}</span></div>
      <div class="tgh">Toughness: <span>{{activeCharacter.tgh}}</span></div>
      <div class="cha">Charisma: <span>{{activeCharacter.cha}}</span></div>
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
      <h3 class="traitsHeader">Traits:</h3>
      <div class="traits">
        <div class="trait" v-for="trait in activeCharacter.traits" v-bind:key="trait.id">
          <h4 v-on:click="trait.toggled=!trait.toggled" v-if="!trait.toggled">{{trait.name}}</h4>
          <div class="traitDetails" v-if="trait.toggled">
            <h4 class="traitName">{{trait.name}}</h4>
            <p class="traitDescription"> {{trait.description}}</p>
            <button class="hide" v-on:click="trait.toggled=!trait.toggled">Hide trait</button>
          </div>
        </div>
      </div>
      <h3 class="abilitiesHeader">Abilities:</h3>
      <div class="abilities">
        <div class="ability" v-for="ability in activeCharacter.abilities" v-bind:key="ability.id">
          <h4 v-on:click="ability.toggled=!ability.toggled" v-if="!ability.toggled">{{ability.name}}</h4>
          <div class="abilityDetails" v-if="ability.toggled">
            <h4 class="abilityName">{{ability.name}}</h4>
            <p class="abilityDescription"> {{ability.description}}</p>
            <button class="hide" v-on:click="ability.toggled=!ability.toggled">Hide Skill</button>
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
      <button class="edit" v-on:click="modal='edit'">Edit Character</button>
      <button class="viewback" v-on:click="clearCharacter(); populateCharacters(); modal=''">Back</button>
    </div>
    <div class="editModal" v-else-if="modal==='edit'">
      <div>Name<input class="name" v-model="activeCharacter.name" placeholder="name"/></div>
      <div>Health<input class="hp" v-model="activeCharacter.health" placeholder="health" type="number" /></div>
      <div>Exhaustion<input class="exhaustion" v-model="activeCharacter.exhaustion" placeholder="exhaustion" type="number" /></div>
      <div>Race<input class="race" v-model="activeCharacter.race" placeholder="race" /></div>
      <div>Yid<input class="yid" v-model="activeCharacter.yid" placeholder="yid" type="number" /></div>
      <div>Strength<input class="str" v-model="activeCharacter.str" placeholder="strength" type="number" /></div>
      <div>Dexterity<input class="dex" v-model="activeCharacter.dex" placeholder="dexterity" type="number" /></div>
      <div>Intelligence<input class="int" v-model="activeCharacter.int" placeholder="intelligence" type="number" /></div>
      <div>Toughness<input class="tgh" v-model="activeCharacter.tgh" placeholder="toughness" type="number" /></div>
      <div>Charisma<input class="cha" v-model="activeCharacter.cha" placeholder="charisma" type="number" /></div>
      <div>Willpower<input class="will" v-model="activeCharacter.will" placeholder="willpower" type="number" /></div>
      <div class="skillsEdit">
        <div class="skill" v-for="skill in activeCharacter.skills" v-bind:key="skill.id">
          <input class="skillName" v-model="skill.name" placeholder="skill name" />
          <input class="skillDescription" v-model="skill.description" placeholder="skill description" />
          <button class="skillDelete" v-on:click="deleteSkill(skill)">Delete Skill</button>
        </div>
      </div>
      <div class="traitsEdit">
        <div class="trait" v-for="trait in activeCharacter.traits" v-bind:key="trait.id">
          <input class="traitName" v-model="trait.name" placeholder="trait name" />
          <input class="traitDescription" v-model="trait.description" placeholder="trait description" />
          <button class="traitDelete" v-on:click="deleteTrait(trait)">Delete trait</button>
        </div>
      </div>
      <div class="abilitiesEdit">
        <div class="ability" v-for="ability in activeCharacter.abilities" v-bind:key="ability.id">
          <input class="abilityName" v-model="ability.name" placeholder="ability name" />
          <input class="abilityDescription" v-model="ability.description" placeholder="ability description" />
          <button class="abilityDelete" v-on:click="deleteAbility(ability)">Delete ability</button>
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
      <button class="newTrait" v-on:click="newTrait">Add New Blank Trait</button>
      <button class="newAbility" v-on:click="newAbility">Add New Blank Ability</button>
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
    <div class="editModal" v-else-if="modal==='creation'">
      <div>Name<input class="name" v-model="activeCharacter.name" placeholder="name"/></div>
      <div>Health<input class="hp" v-model="activeCharacter.health" placeholder="health" type="number" /></div>
      <div>Exhaustion<input class="exhaustion" v-model="activeCharacter.exhaustion" placeholder="exhaustion" type="number" /></div>
      <div>Race<input class="race" v-model="activeCharacter.race" placeholder="race" /></div>
      <div>Yid<input class="yid" v-model="activeCharacter.yid" placeholder="yid" type="number" /></div>
      <div>Strength<input class="str" v-model="activeCharacter.str" placeholder="strength" type="number" /></div>
      <div>Dexterity<input class="dex" v-model="activeCharacter.dex" placeholder="dexterity" type="number" /></div>
      <div>Intelligence<input class="int" v-model="activeCharacter.int" placeholder="intelligence" type="number" /></div>
      <div>Toughness<input class="tgh" v-model="activeCharacter.tgh" placeholder="toughness" type="number" /></div>
      <div>Charisma<input class="cha" v-model="activeCharacter.cha" placeholder="charisma" type="number" /></div>
      <div>Willpower<input class="will" v-model="activeCharacter.will" placeholder="willpower" type="number" /></div>
      <div class="skillsEdit">
        <div class="skill" v-for="skill in activeCharacter.skills" v-bind:key="skill.id">
          <input class="skillName" v-model="skill.name" placeholder="skill name" />
          <input class="skillDescription" v-model="skill.description" placeholder="skill description" />
          <button class="skillDelete" v-on:click="deleteSkill(skill)">Delete Skill</button>
        </div>
      </div>
      <div class="traitsEdit">
        <div class="trait" v-for="trait in activeCharacter.traits" v-bind:key="trait.id">
          <input class="traitName" v-model="trait.name" placeholder="trait name" />
          <input class="traitDescription" v-model="trait.description" placeholder="trait description" />
          <button class="traitDelete" v-on:click="deleteTrait(trait)">Delete trait</button>
        </div>
      </div>
      <div class="abilitiesEdit">
        <div class="ability" v-for="ability in activeCharacter.abilities" v-bind:key="ability.id">
          <input class="abilityName" v-model="ability.name" placeholder="ability name" />
          <input class="abilityDescription" v-model="ability.description" placeholder="ability description" />
          <button class="abilityDelete" v-on:click="deleteAbility(ability)">Delete ability</button>
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
      <button class="newTrait" v-on:click="newTrait">Add New Blank Trait</button>
      <button class="newAbility" v-on:click="newAbility">Add New Blank Ability</button>
      <button class="newItem" v-on:click="newItem">Add New Blank Item</button>
      <button class="update" v-on:click="makeCharacter">Make Character</button>
      <button v-on:click="clearCharacter(); populateCharacters(); modal=''">Back</button>
    </div>
    <div class="listView" v-else>
      <h1>Characters</h1>
      <h2 v-for="character in characters" v-on:click="viewCharacter(character)" v-bind:key="character.id">{{character.name}}<br/>{{character.race}}</h2>
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
        health: '',
        exhaustion: '',
        race: '',
        yid: '',
        str: '',
        dex: '',
        tgh: '',
        int: '',
        cha: '',
        will: '',
        skills: [],
        traits: [],
        abilities: [],
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
      axios.get('https://api.tuskgaming.com/charactersVoyage/all', {headers: { 'Authorization': 'JWT ' + vue.user.token }})
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
      vue.activeCharacter.health = character.health
      vue.activeCharacter.exhaustion = character.exhaustion
      vue.activeCharacter.race = character.race
      vue.activeCharacter.yid = character.yid
      vue.activeCharacter.str = character.str
      vue.activeCharacter.dex = character.dex
      vue.activeCharacter.tgh = character.tgh
      vue.activeCharacter.int = character.int
      vue.activeCharacter.cha = character.cha
      vue.activeCharacter.will = character.will
      vue.activeCharacter.skills = character.skills
      vue.activeCharacter.traits = character.traits
      vue.activeCharacter.abilities = character.abilities
      vue.activeCharacter.inventory = character.inventory
      vue.modal = 'character'
    },
    makeCharacter () {
      let vue = this
      axios.post('https://api.tuskgaming.com/charactersVoyage', {
        name: vue.activeCharacter.name,
        health: vue.activeCharacter.health,
        exhaustion: vue.activeCharacter.exhaustion,
        race: vue.activeCharacter.race,
        yid: vue.activeCharacter.yid,
        str: vue.activeCharacter.str,
        dex: vue.activeCharacter.dex,
        tgh: vue.activeCharacter.tgh,
        int: vue.activeCharacter.int,
        cha: vue.activeCharacter.cha,
        will: vue.activeCharacter.will,
        skills: vue.activeCharacter.skills,
        traits: vue.activeCharacter.traits,
        abilities: vue.activeCharacter.abilities,
        inventory: vue.activeCharacter.inventory
      })
        .then(result => {
          vue.activeCharacter.id = result.data._id
          vue.modal = 'character'
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateCharacter () {
      let vue = this
      axios.put('https://api.tuskgaming.com/charactersVoyage/' + vue.activeCharacter.id, {
        name: vue.activeCharacter.name,
        health: vue.activeCharacter.health,
        exhaustion: vue.activeCharacter.exhaustion,
        race: vue.activeCharacter.race,
        yid: vue.activeCharacter.yid,
        str: vue.activeCharacter.str,
        dex: vue.activeCharacter.dex,
        tgh: vue.activeCharacter.tgh,
        int: vue.activeCharacter.int,
        cha: vue.activeCharacter.cha,
        will: vue.activeCharacter.will,
        skills: vue.activeCharacter.skills,
        traits: vue.activeCharacter.traits,
        abilities: vue.activeCharacter.abilities,
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
      vue.activeCharacter.health = ''
      vue.activeCharacter.exhaustion = ''
      vue.activeCharacter.race = ''
      vue.activeCharacter.yid = 0
      vue.activeCharacter.str = 0
      vue.activeCharacter.dex = 0
      vue.activeCharacter.tgh = 0
      vue.activeCharacter.int = 0
      vue.activeCharacter.cha = 0
      vue.activeCharacter.will = 0
      vue.activeCharacter.skills = []
      vue.activeCharacter.traits = []
      vue.activeCharacter.abilities = []
      vue.activeCharacter.inventory = []
    },
    deleteCharacter () {
      let vue = this
      axios.delete('https://api.tuskgaming.com/charactersVoyage/' + vue.activeCharacter.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
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
    newTrait () {
      let vue = this
      vue.activeCharacter.traits.push({name: '', description: '', toggled: false})
    },
    newAbility () {
      let vue = this
      vue.activeCharacter.abilities.push({name: '', description: '', toggled: false})
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
    deleteTrait (trait) {
      let vue = this
      let position = vue.activeCharacter.traits.indexOf(trait)
      vue.activeCharacter.traits.splice(position, 1)
    },
    deleteAbility (ability) {
      let vue = this
      let position = vue.activeCharacter.abilities.indexOf(ability)
      vue.activeCharacter.abilities.splice(position, 1)
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
  grid-column-end: 11;
  grid-row: 2;
  border: 1px solid black;
}
.race {
  grid-column-start: 1;
  grid-column-end: 11;
  grid-row: 3;
  border: 1px solid black;
}
.hp {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 4;
  border: 1px solid black;
}
.exhaustion {
  grid-column-start: 5;
  grid-column-end: 11;
  grid-row: 4;
  border: 1px solid black;
}
.yid {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 5;
  border: 1px solid black;
}
.str {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 6;
  border: 1px solid black;
}
.dex {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 7;
  border: 1px solid black;
}
.int {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 8;
  border: 1px solid black;
}
.tgh {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 9;
  border: 1px solid black;
}
.cha {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 10;
  border: 1px solid black;
}
.will {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 11;
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
h2 {
  text-align: center;
}
.skills {
  grid-row-start: 14;
  grid-row-end: 20;
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
.traits {
  grid-row-start: 22;
  grid-row-end: 26;
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
.abilities {
  grid-row-start: 28;
  grid-row-end: 34;
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
  grid-row-start: 37;
  grid-row-end: 44;
  grid-column-start: 1;
  grid-column-end: 11;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(20, 1em);
  border: 1px solid black;
  margin-bottom: 140px;
}
.skillsHeader {
  text-align: center;
  grid-row-start: 12;
  grid-column-start: 1;
  grid-column-end: 3;
}
.traitsHeader {
  text-align: center;
  grid-row-start: 20;
  grid-column-start: 1;
  grid-column-end: 3;
}
.abilitiesHeader {
  text-align: center;
  grid-row-start: 26;
  grid-column-start: 1;
  grid-column-end: 3;
}
.itemsHeader {
  text-align: center;
  grid-row-start: 36;
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
  height: 2em;
  line-height: 1.4em;
  width: 100%;
  left: 0;
  position: fixed;
  bottom: 40px;
}
.viewback {
  box-shadow: 0px 3px 4px black;
  background-image: url('../assets/noise.png');
  height: 2em;
  line-height: 1.4em;
  width: 100%;
  left: 0;
  color: #fff;
  position: fixed;
  bottom: 0;
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
  text-align: center;
  grid-column-start: 2;
  grid-column-end: 10;
  background-image: url('../assets/noise.png');
  line-height: 28px;
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
