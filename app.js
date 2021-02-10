// storage Controller
const StorageCtrl = (() => {
    return {
        storeDataToLocal: (item) => {
            let items;
            console.log(item);
            if (localStorage.getItem('items') === null) {
                items = [];
                console.log('item created');

                items.push(item);

                localStorage.setItem('items', JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem('items'));

                items.push(item);
                console.log('item pushed');

                localStorage.setItem('items', JSON.stringify(items));
            }
            console.log(items);
        },

        getDataFromLocal: () => {
            let items;

            if (localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },

        updateLocalData: (updatedItem) => {
            items = JSON.parse(localStorage.getItem('items'));

            items.forEach((item, index) => {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },

        deleteFromLocalData: (id) => {
            items = JSON.parse(localStorage.getItem('items'));

            items.forEach((item, index) => {
                if (id === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },

        clearAllFromLocal: () => {
            localStorage.removeItem();
        },
    };
})();

// item Controller
const itemCtrl = (() => {
    // Fetching the data the data
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // storing the data
    const data = {
        // items: [
        //     // { id: 0, name: "panipuri", calories: 200 },
        //     // { id: 1, name: "pizza", calories: 300 },
        //     // { id: 2, name: "pasta", calories: 400 },
        // ],
        items: StorageCtrl.getDataFromLocal(),
        currentItem: null,
        totalCalories: 0,
    };

    // making data public by returning

    return {
        getItems: () => {
            return data.items;
        },
        addItems: (name, calories) => {
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            calories = parseInt(calories);
            newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem;
        },

        setCurrentItem: (item) => {
            data.currentItem = item;
        },

        getCurrentItem: () => {
            return data.currentItem;
        },

        deleteItemData: (id) => {
            // console.log(id);
            ids = data.items.map((item) => {
                return item.id;
            });
            // console.log(ids);
            const index = ids.indexOf(id);
            // console.log(index);
            data.items.splice(index, 1);
        },

        updateDataItem: (name, calories) => {
            let found = null;
            data.items.forEach((item) => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = parseInt(calories);
                    found = item;
                    // console.log(found);
                }
            });
            return found;
        },

        makeCurrentItem: (id) => {
            let found = null;
            data.items.forEach((item) => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },

        clearAllItemData: () => {
            data.items = [];
        },

        getTotalCalories: () => {
            let totalCal = 0;
            data.items.forEach((item) => {
                totalCal += item.calories;
            });
            data.totalCalories = totalCal;
            return data.totalCalories;
        },

        logData: () => {
            return data;
        },
    };
})();

// UI Controller
const UICtrl = (() => {
    // grabing the ui elements
    const UISelectors = {
        itemList: document.querySelector('#item-list'),
        itemName: document.querySelector('#item-name'),
        calories: document.querySelector('#item-calories'),
        addBtn: document.querySelector('.add-btn'),
        updateBtn: document.querySelector('.update-btn'),
        deleteBtn: document.querySelector('.delete-btn'),
        backBtn: document.querySelector('.back-btn'),
        totalcalories: document.querySelector('.total-calories'),
        allUIList: '#item-list li',
        clearAllBtn: '.clear-btn',
    };

    // making data public by returning
    return {
        showData: (items) => {
            let html = '';
            console.log('UI initializing');

            items.forEach((item) => {
                html += `
                    <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
        </a>
        </li>`;
            });

            // insert list item
            UISelectors.itemList.innerHTML = html;
        },

        showNewData: (item) => {
            UISelectors.itemList.style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            // console.log(item);
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
        </a>`;
            UISelectors.itemList;
            return UISelectors.itemList.insertAdjacentElement('beforeend', li);
        },
        // making UI selectors public
        getUISelectors: () => {
            return UISelectors;
        },
        getUIInput: () => {
            return {
                name: UISelectors.itemName.value,
                cal: UISelectors.calories.value,
            };
        },

        showUpdateData: (item) => {
            let listsItem = document.querySelectorAll(UISelectors.allUIList);
            listsItem = Array.from(listsItem);
            // console.log(item);
            // console.log(listsItem[0].id);
            listsItem.forEach((items) => {
                const itemId = items.getAttribute('id');
                // console.log(itemId);
                // console.log(item.id);
                if (itemId === `item-${item.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML = `
                            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
                } else {
                    console.log('no match');
                }
            });
        },

        showTotalCalories: (cal) => {
            UISelectors.totalcalories.textContent = cal;
        },

        hideList: () => {
            UISelectors.itemList.style.display = 'none';
        },
        valueFillState: () => {
            UICtrl.clearField();
            UISelectors.addBtn.style.display = 'inline';
            UISelectors.backBtn.style.display = 'none';
            UISelectors.deleteBtn.style.display = 'none';
            UISelectors.updateBtn.style.display = 'none';
        },

        editState: () => {
            UISelectors.addBtn.style.display = 'none';
            UISelectors.backBtn.style.display = 'inline';
            UISelectors.deleteBtn.style.display = 'inline';
            UISelectors.updateBtn.style.display = 'inline';
        },

        addEditedItem: () => {
            itemName = UISelectors.itemName.value = itemCtrl.getCurrentItem().name;
            calories = UISelectors.calories.value = itemCtrl.getCurrentItem().calories;
        },

        deleteUIItem: (id) => {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
            const allList = document.querySelector('.collection-item');
            console.log(allList);
            if (allList === null) {
                UICtrl.hideList();
            }
        },

        deleteAllUIItem: () => {
            let items = document.querySelectorAll(UISelectors.allUIList);

            items = Array.from(items);

            items.forEach((item) => {
                item.remove();
            });
        },

        clearField: () => {
            itemName = UISelectors.itemName.value = '';
            calories = UISelectors.calories.value = '';
            UISelectors.itemName.focus();
        },
    };
})();

// App Controller

const App = ((itemCtrl, UICtrl, StorageCtrl) => {
    // grtting the values from UI
    const getValue = () => {
        // importing UI selectors from UICtrl
        const UISelect = UICtrl.getUISelectors();

        // listening to the events
        UISelect.addBtn.addEventListener('click', fetchingValues);

        UISelect.itemList.addEventListener('click', editBtnAction);

        UISelect.updateBtn.addEventListener('click', updateData);

        UISelect.backBtn.addEventListener('click', backBtnState);

        UISelect.deleteBtn.addEventListener('click', deleteItem);

        document
            .querySelector(UISelect.clearAllBtn)
            .addEventListener('click', clearAllItem);
    };

    // fetchingValues
    const fetchingValues = (e) => {
        // getting the input values
        const input = UICtrl.getUIInput();
        // add item to data
        if (input.name !== '' && input.cal !== '') {
            // adding the data to database
            const newItem = itemCtrl.addItems(input.name, input.cal);
            // console.log(newItem);

            // adding data to storage
            StorageCtrl.storeDataToLocal(newItem);

            // showing the data to UI
            UICtrl.showNewData(newItem);

            // calculating the total calories
            const getTotalCal = itemCtrl.getTotalCalories();
            console.log(getTotalCal);

            // showing the calories to UI
            UICtrl.showTotalCalories(getTotalCal);

            // clearing the input field
            UICtrl.clearField();
        }

        // preventing reload
        e.preventDefault();
    };

    const editBtnAction = (e) => {
        // validating if exactly click the pencile icon
        if (e.target.classList.contains('edit-item')) {
            // storing the id of clicked list and knowing it exactly and passing the exact id
            const item = e.target.parentElement.parentElement.id;
            const itemArr = item.split('-');
            const id = parseInt(itemArr[1]);
            // console.log(itemArr[1]);
            const itemToEdit = itemCtrl.makeCurrentItem(id);
            itemCtrl.setCurrentItem(itemToEdit);

            // adding the data to UI for edit
            UICtrl.addEditedItem();

            // showing the rewuired btn
            UICtrl.editState();
        }

        // preventing reload
        e.preventDefault();
    };

    const updateData = (e) => {
        // getting the input values
        const input = UICtrl.getUIInput();
        console.log(input);

        // updating the data in item
        const updatedItem = itemCtrl.updateDataItem(input.name, input.cal);
        // console.log(updatedItem);

        StorageCtrl.updateLocalData(updatedItem);

        // updatin the total calories
        const getTotalCal = itemCtrl.getTotalCalories();

        // updating the data to UI
        UICtrl.showUpdateData(updatedItem);

        // showing the calories to UI
        UICtrl.showTotalCalories(getTotalCal);

        // clearing the input field
        UICtrl.clearField();

        // preventing reload
        e.preventDefault();
    };

    const backBtnState = (e) => {
        console.log('back button');

        UICtrl.clearField();

        UICtrl.valueFillState();

        e.preventDefault();
    };

    const deleteItem = (e) => {
        const currentItem = itemCtrl.getCurrentItem();

        // console.log(currentItem);
        itemCtrl.deleteItemData(currentItem.id);

        // deleting the data from local
        StorageCtrl.deleteFromLocalData(currentItem.id);

        UICtrl.deleteUIItem(currentItem.id);

        // updatin the total calories
        const getTotalCal = itemCtrl.getTotalCalories();

        // showing the calories to UI
        UICtrl.showTotalCalories(getTotalCal);

        UICtrl.valueFillState();

        // clearing the input field
        UICtrl.clearField();
        e.preventDefault();
    };

    const clearAllItem = (e) => {
        console.log('clear btn');
        itemCtrl.clearAllItemData();

        UICtrl.deleteAllUIItem();

        const getTotalCal = itemCtrl.getTotalCalories();

        // showing the calories to UI
        UICtrl.showTotalCalories(getTotalCal);

        UICtrl.valueFillState();

        // clearing the input field
        UICtrl.clearField();

        UICtrl.hideList();
        e.preventDefault();
    };

    return {
        init: () => {
            const items = itemCtrl.getItems();
            console.log('intializing app...');
            // adding the items to data
            // console.log(items);
            UICtrl.valueFillState();
            getValue();
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.showData(items);
            }
            // show log data to the UI

            // Get total calories
            const getTotalCal = itemCtrl.getTotalCalories();

            // showing the calories to UI
            UICtrl.showTotalCalories(getTotalCal);
        },
    };
})(itemCtrl, UICtrl, StorageCtrl);

App.init();
