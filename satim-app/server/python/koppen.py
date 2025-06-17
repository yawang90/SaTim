from itertools import combinations, chain

# Hilfsfunktionen
def powerset(items):
    """Alle nicht-leeren Teilmengen eines Sets (ausgeschlossen ∅)."""
    return list(chain.from_iterable(combinations(items, r) for r in range(1, len(items) + 1)))


# Hauptfunktion
def koppen_query_algorithm(items, expert_response_func):
    Q = list(items)
    P_yes = set()
    P_no = set()
    P = set()
    P_neg = set()

    k = 0
    max_k = 1  # Maximalgröße des Blocks
    necessary_eq = 0
    block_open = True

    while block_open:
        k += 1

        if max_k is not None and k > max_k:
            print(f"Maximale Blockgröße {max_k} erreicht. Algorithmus wird beendet.")
            break
        block_open = False
        antecedents = list(combinations(Q, k))
        print("Combinations:" + str(antecedents))

        for A in antecedents:
            for q in Q:

                print(f"\n--- Prüfe Anfrage: {set(A)} ⊢ {q} ---")

                # Trivialfall q ∈ A - wenn q in A ist q auf jeden Fall eine Vorraussetzung für A
                if q in A:
                    print(f"  ⮞ Trivial: {q} ∈ {set(A)} → automatisch JA")
                    P_yes.add((A, q))
                    continue

                already_known = (A, q) in P or (A, q) in P_neg
                if already_known:
                    print("  ⮞ Schon bekannt (positive oder negative Entailment) → überspringe")
                    continue

                # Inferenz prüfen
                inferred = False
                for (A1, p1) in list(P):
                    for (B1, q1) in list(P):
                        set_A1 = set(A1)
                        set_B1 = set(B1)

                        # IR1: A ⊢ p, B ⊢ q, B = A ∪ {p}
                        if set_B1 == set_A1.union({p1}) and (A1, p1) in P and (B1, q1) in P:
                            if (tuple(set_B1), q1) not in P:
                                print(f"  ⮞ Abgeleitet durch IR1: {set_B1} ⊢ {q1}")
                                P.add((tuple(set_B1), q1))
                                inferred = True

                        # IR2: A ⊢ p, A ⊢ q, B = A ∪ {p}, B ⊢ q ist redundant
                        elif set_B1 == set_A1.union({p1}) and (A1, p1) in P and (A1, q1) in P:
                            # hier: kein neues Entailment – überspringbar
                            continue

                        # IR3: A ⊢ p, B ⊢ q, B ⊢ p, A = B ∪ {q}
                        elif set_A1 == set_B1.union({q1}) and (A1, p1) in P and (B1, q1) in P and (B1, p1) in P:
                            if (A1, q1) not in P:
                                print(f"  ⮞ Abgeleitet durch IR3: {set_A1} ⊢ {q1}")
                                P.add((A1, q1))
                                inferred = True

                        # IR4: A = B, A ⊢ p, B ⊢ q, B ∪ {q} ⊢ p ⇒ A ⊢ q
                        elif set_A1 == set_B1 and (A1, p1) in P and (B1, q1) in P and ((tuple(set_B1.union({q1})), p1) in P):
                            if (A1, q1) not in P:
                                print(f"  ⮞ Abgeleitet durch IR4: {set_A1} ⊢ {q1}")
                                P.add((A1, q1))
                                inferred = True


                if inferred:
                    print("  ⮞ Entailment konnte durch Inferenz abgeleitet werden → überspringe Expertenanfrage")
                    continue
                print("__________________________________________________________________________________________________")
                print(f"  ⮞ Expertenanfrage nötig: Frage, ob {set(A)} ⊢ {q}")
                print("__________________________________________________________________________________________________")
                necessary_eq += 1
                block_open = True
                answer = expert_response_func(A, q)
                if answer:
                    print(f"     → Antwort: JA")
                    P_yes.add((A, q))
                    P.add((A, q))
                else:
                    print(f"     → Antwort: Nein")
                    P_no.add((A, q))
                    P_neg.add((A, q))
    print("Benötigte Anfragen:" + str(necessary_eq))
    return P_yes, P_no

# Beispiel für eine Expertenfunktion (Dummy)
def dummy_expert(A, q):
    # Beispiel: Wenn A ⊆ {a,b} und q == c, dann "ja", sonst "nein"
    return set(A) <= {"a", "b"} and q == "c"


def dummy_expert(A, q):
    # A enthält Items, die der Schüler *nicht kann*
    prerequisites = {
        "b": {"a"},
        "c": {"b"},
        "d": {"c"},
    }
    return q in prerequisites and prerequisites[q].issubset(set(A))


def generate_items(n):
    """Generiert eine Liste von n Items."""
    return [chr(i) for i in range(97, 97 + n)]  # 'a' bis 'z'

# Anwendung
items = generate_items(100)  # Generiere 5 Items: ['a', 'b', 'c', 'd', 'e']
P_yes, P_no = koppen_query_algorithm(items, dummy_expert)


#print("Positive Entailments:")
#for p in sorted(P_yes):
#    print(f"{set(p[0])} ⊢ {p[1]}")





