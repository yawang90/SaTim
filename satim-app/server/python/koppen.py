import sys, json
from itertools import permutations, chain

def koppen_query_algorithm(items, P_yes, P_neg):
    possible_item_combinations = list(permutations(items, 2))
    add_identity(P_yes, items)
    add_negation(P_yes, P_neg)
    infer_IR1(P_yes, P_neg)
    infer_IR2(P_yes, P_neg)
    possible_results = [
        item for item in possible_item_combinations
        if not already_known(item, P_yes, P_neg)
    ]
    return possible_results[0] if len(possible_results) > 0 else None

def already_known(item, P_yes, P_neg):
    if item in P_yes or item in P_neg:
        return True
    else:
        return False

def add_identity(P_yes, items):
    for item in items:
        P_yes.append((item, item))

def add_negation(P_yes, P_neg):
    for (A, B) in P_yes:
        P_neg.append((B, A))

# IR1: A ⊢ x, B ⊢ A => B ⊢ x
def infer_IR1(P_yes, P_neg):
    pyes_changed = True
    while pyes_changed:
        pyes_changed = False
        current_pyes = list(P_yes)
        for (A, x) in current_pyes:
            for (B, A2) in current_pyes: # B, A2 represents B ⊢ A
                if A2 == A and not B == x:
                    if not already_known((B, x), P_yes, P_neg):
                        P_yes.append((B, x))
                        add_negation(P_yes, P_neg)
                        pyes_changed = True

# IR2: A ⊢ x, y not ⊢ A => y not ⊢ x
def infer_IR2(P_yes, P_neg):
    pneg_changed = True
    while pneg_changed:
        pneg_changed = False
        current_pneg = list(P_neg)
        for (A, x) in P_yes:
            for (y, A2) in current_pneg:
                if A2 == A:
                    if not already_known((y, x), P_yes, P_neg):
                        P_neg.append((y, x))
                        pneg_changed = True

items = json.load(sys.stdin)
competence_items = items.get("competenceItems", [])
p_yes = items.get("pyes", [])
p_yes_tuples = [tuple(pair) for pair in p_yes]
p_no = items.get("pno", [])
p_no_tuples = [tuple(pair) for pair in p_no]
result = koppen_query_algorithm(competence_items, p_yes_tuples, p_no_tuples)
print(json.dumps(result))






