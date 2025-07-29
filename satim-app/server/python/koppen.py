import sys, json
from itertools import permutations, chain

def koppen_query_algorithm(items, P_yes, P_neg):
    possible_item_combinations = list(permutations(items, 2))
    infer_IR1(P_yes, P_neg)
    possible_results = [
        item for item in possible_item_combinations
        if not already_known(item, P_yes, P_neg)
    ]
    return possible_results[0] if len(possible_item_combinations) > 0 else None

def already_known(item, P_yes, P_neg):
    if item in P_yes or item in P_neg:
        return True
    else:
        return False

# IR1: B1 ⊢ b1, A1 ⊢ a1, A1 ⊢ B1 => A1 ⊢ b1
def infer_IR1(P_yes, P_neg):
    pyes_changed = True
    while pyes_changed:
        pyes_changed = False
        current_pyes = list(P_yes)
        for (A1, a1) in current_pyes:
            for (B1, b1) in current_pyes:
                if a1 == B1 and not A1 == b1:
                    if not already_known((A1, b1), P_yes, P_neg):
                        P_yes.append((A1, b1))
                        pyes_changed = True


items = json.load(sys.stdin)
competence_items = items.get("competenceItems", [])
p_yes = items.get("pyes", [])
p_yes_tuples = [tuple(pair) for pair in p_yes]
p_no = items.get("pno", [])
p_no_tuples = [tuple(pair) for pair in p_no]
result = koppen_query_algorithm(competence_items, p_yes_tuples, p_no_tuples)
print(json.dumps(result))






