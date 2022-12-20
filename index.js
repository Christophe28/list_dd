let item = document.getElementById("item");
let confirm = document.getElementById("confirm");
let container_list = document.getElementById("container_list");
let button_display_user_by_order = document.getElementById("button_display_user_by_order");
let container_sort_gamer = document.getElementById("container_sort_gamer");

let gamers = [];
let sort_gamers = [];


const create_modif_cara = (divParent, index) => {
    let count = -1;
    const container_modif_cara = document.createElement("select");
    while(count < 20) {
        count ++;
        let value_cara = document.createElement("option");
        value_cara.setAttribute("value", count);
        value_cara.textContent = count;
        container_modif_cara.appendChild(value_cara);
    }
    divParent.appendChild(container_modif_cara);
    container_modif_cara.addEventListener("change", (e) => {
        // console.log(divParent.childNodes[1].id);
        console.log("La valeur de base == >", gamers[index].result_dice)
        console.log("La valeur plus le modificateur", parseInt(gamers[index].result_dice) + parseInt(e.target.value));
        gamers.splice(index, 1, {
            name: gamers[index].name,
            result_dice: parseInt(gamers[index].result_dice + parseInt(e.target.value))
        })
        console.log(gamers);
    })
    console.log(container_modif_cara.value);
}

button_display_user_by_order.addEventListener("click", () => {
    let correct_array = gamers.sort((a, b) => {
        if(a.result_dice < b.result_dice) 
            return - 1;
        if(a.result_dice > b.result_dice)
            return 1;
        return 0
    });
    sort_gamers = correct_array;
    for(let gamer of sort_gamers) {      
        let gamer_x = document.createElement("p");
        gamer_x.textContent = `joueur ==> ${gamer.name} // Jet de dé ==> ${gamer.result_dice}`;
        container_sort_gamer.appendChild(gamer_x);
    }
    console.log("button afficher le sort", sort_gamers);
})

const create_dice_20 = (my_parent, index) => {
    let dice_20 = document.createElement("input");
    dice_20.setAttribute("type", "button");
    dice_20.setAttribute("id", "dice_20");
    dice_20.setAttribute("value", "20");

    dice_20.addEventListener("click", () => {
        gamers.splice(index, 1, {
            name: dice_20.parentElement.firstChild.textContent,
            result_dice: Math.round(Math.random() * 20)
        });

    })

    my_parent.appendChild(dice_20);

}

const createItem = () => {
    let container_my_list = document.createElement("div");
    let myList = document.createElement("p");
    myList.textContent = item.value;
    let buttonDel = document.createElement("button");

    container_my_list.animate([
        {
            transform: 'translateX(50%)',
            opacity: '0%'
        },
        {
            transform: 'translateX(0px)',
            opacity: '100%',
        }
    ],{duration: 500})
    
    buttonDel.setAttribute("id", container_list.getElementsByTagName("div").length);
    buttonDel.textContent = "X";
    buttonDel.addEventListener("click", () => {
        container_my_list.animate([
            {
                transform: 'translateX(0px)',
                opacity: '100%'
            },
            {
                transform: 'translateX(-1500px)',
                opacity: '0%'
            }
        ],{duration: 800});
        
        setTimeout(() => {
            buttonDel.parentElement.remove();
        }, 800);
    })
    container_my_list.appendChild(myList);
    container_my_list.appendChild(buttonDel);
    container_list.appendChild(container_my_list);
    create_modif_cara(container_my_list, buttonDel.id);
    create_dice_20(container_my_list, buttonDel.id);
    item.value = "";
}

item.addEventListener("keypress", (e) => {
    e.key === "Enter" ? createItem() : "";
})

confirm.addEventListener("click", () => {
    createItem();
})