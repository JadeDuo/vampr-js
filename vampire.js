class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let distance = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      distance += 1;
      currentVamp = currentVamp.creator;
    }
    return distance;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  //helper function for common ancestors
  allAncestors() {
    const anscestors = [];
    let vamp = this;
    while (vamp.creator) {
      anscestors.push(vamp);
      vamp = vamp.creator;
    }
    return anscestors;
  }
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let junior;
    let senior;
    if (this.isMoreSeniorThan(vampire)) {
      junior = vampire.allAncestors();
      senior = this.allAncestors();
    } else {
      junior = this.allAncestors();
      senior = vampire.allAncestors();
    }
    for (let vamp of senior) {
      for (let vampJR of junior) {
        if (vampJR === vamp) {
          return vamp;
        }
      }
      
    }
  }
}


module.exports = Vampire;